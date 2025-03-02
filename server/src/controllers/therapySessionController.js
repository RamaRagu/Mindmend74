const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

async function createGoogleCalendarEvent(
  parent,
  doctor,
  childName,
  date,
  timeSlot
) {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_ID,
    null,
    process.env.GOOGLE_CLIENT_SECRET.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/calendar"]
  );

  const calendar = google.calendar({ version: "v3", auth });

  console.log("Creating event");

  const startDateTime = new Date(`${date}T${timeSlot.split("-")[0]}:00Z`);
  const endDateTime = new Date(`${date}T${timeSlot.split("-")[1]}:00Z`);

  const event = {
    summary: "Therapy Session for Autism Support - ${childName}",
    description: `Therapy session for child: ${childName}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "UTC",
    },
    attendees: [{ email: parent.email }, { email: doctor.email }],
    conferenceData: {
      createRequest: {
        requestId: `therapy-session-${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  console.log("Inserting event");

  const createdEvent = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  console.log(createdEvent.data);

  const callLink = createdEvent.data.hangoutLink;

  return callLink;
}

// Create a new therapy session
exports.createSession = async (req, res) => {
  const { doctorId, childId, date, timeSlot } = req.body;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { user: true },
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    let availableSlots = doctor.availableSlots || [];

    const dateEntry = availableSlots.find((d) => d.date === date);
    if (!dateEntry || !dateEntry.slots.includes(timeSlot)) {
      return res.status(400).json({ message: "Slot not available" });
    }

    // Get the child first
    const child = await prisma.child.findUnique({
      where: { id: childId },
      include: {
        parent: {
          include: {
            user: true, // Include the user details of the parent
          },
        },
      },
    });

    if (!child) return res.status(404).json({ message: "Child not found" });

    // Get the parent from the child's relation
    const parent = child.parent;

    // Get Doctor Email
    doctor.email = doctor.user.email;

    // Get Parent Email
    parent.email = parent.user.email;

    // Create Google Calendar Event
    const callLink = await createGoogleCalendarEvent(
      parent,
      doctor,
      child.name,
      date,
      timeSlot
    );

    // Create session
    const session = await prisma.therapySession.create({
      data: {
        doctorId,
        childId,
        sessionDate: new Date(date),
        sessionType: "ONLINE",
        timeSlot,
        status: "CONFIRMED",
        callLink: callLink,
      },
    });

    // Remove booked slot
    dateEntry.slots = dateEntry.slots.filter((slot) => slot !== timeSlot);

    if (dateEntry.slots.length === 0) {
      // Remove date if no slots left
      availableSlots = availableSlots.filter((d) => d.date !== date);
    }

    await prisma.doctor.update({
      where: { id: doctorId },
      data: { availableSlots },
    });

    res.status(201).json({ message: "Session booked", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get details of a therapy session by ID
exports.getSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await prisma.therapySession.findUnique({
      where: { id },
      include: { child: true, doctor: true },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a therapy session by ID
exports.updateSessionById = async (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const session = await prisma.therapySession.update({
      where: { id },
      data: {
        date,
        status,
      },
    });

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a therapy session by ID
exports.deleteSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.therapySession.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sessions for a doctor
exports.getDoctorSessions = async (req, res) => {
  try {
    const sessions = await prisma.therapySession.findMany({
      where: { doctorId: req.user.doctor.id },
      include: { child: true },
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
