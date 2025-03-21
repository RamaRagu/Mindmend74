import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.ebook.deleteMany({});
    
    // Common structure for page generation
    const generatePages = (texts: string[]): any[] => 
        texts.map((text, index) => ({
            pageNumber: index + 1,
            text
        }));
    
    const ebookTemplates = [
        {
            title: "Tom's Friendly Hello",
            author: "Maria Johnson",
            illustrator: "David Chen",
            bookNumber: 1,
            texts: [
                "Hello! My name is Tom. I have orange fur and bright green eyes. I like to smile and talk to friends like you!",
                "Every morning, I wake up with a big stretch. I love to start my day with a healthy breakfast.",
                "Then I brush my teeth and wash my face. Staying clean is important!",
                "During the day, I like to play games and talk with my friends.",
                "Sometimes I sing songs or tell jokes. Do you like jokes?",
                "I also like to explore and learn new things every day.",
                "When it gets dark, I get ready for bed. I brush my teeth again!",
                "Good night! I hope we can be friends and have fun together!"
            ],
            description: "Join Talking Tom as he introduces himself and shares his daily routine. This friendly cat wants to be your friend!",
            categories: ["friendship", "daily routines", "introduction"],
            readingTimeMin: 5
        },
        {
            title: "Tom's Adventure in the Park",
            author: "Sarah Williams",
            illustrator: "Michael Lee",
            bookNumber: 2,
            texts: [
                "Today Tom is going to the park! He's excited to play outside in the sunshine.",
                "Tom brings his ball to the park. He loves to bounce it and catch it.",
                "At the park, Tom sees his friend Angela! 'Hello Angela!' says Tom.",
                "Tom and Angela play catch with the ball. It's so much fun!",
                "Later, they find a big tree to climb. Tom goes first to show the way.",
                "From the tree, they can see the whole park! What a beautiful view!",
                "It starts to rain, so Tom and Angela run for shelter.",
                "After the rain stops, they see a rainbow! What a perfect day at the park!"
            ],
            description: "Follow Tom on an exciting day at the park where he plays games, meets friends, and discovers the beauty of nature.",
            categories: ["outdoors", "friendship", "adventure"],
            readingTimeMin: 6
        },
        {
            title: "Tom Learns to Share",
            author: "Robert Thompson",
            illustrator: "Emma Garcia",
            bookNumber: 3,
            texts: [
                "Tom has a new toy car. It's shiny and red - his favorite color!",
                "Tom's friend Hank comes over to play. He asks if he can try the car.",
                "Tom doesn't want to share his new car. He holds it tight.",
                "Hank looks sad. He sits alone while Tom plays with the car.",
                "Tom notices Hank is sad. He remembers how good it feels when friends share with him.",
                "Tom decides to share his car with Hank. 'Here, you can play with it too,' says Tom.",
                "Hank smiles and says 'Thank you!' They take turns playing with the car.",
                "Sharing made playtime twice as fun! Tom and Hank are both happy."
            ],
            description: "Tom learns an important lesson about sharing and how it can make friendships stronger.",
            categories: ["sharing", "friendship", "emotions"],
            readingTimeMin: 5
        },
        {
            title: "Tom's Rainy Day",
            author: "Jennifer Adams",
            illustrator: "Peter Wong",
            bookNumber: 4,
            texts: [
                "Today it's raining outside. Tom looks out the window and feels a little sad.",
                "Tom wanted to play outside in the sunshine, but now he can't.",
                "Tom's friend Ginger calls. 'Let's find something fun to do indoors!' she says.",
                "Tom and Ginger decide to build a fort with blankets and pillows.",
                "Inside their cozy fort, they read books with a flashlight. It's an adventure!",
                "Next, they make shadow puppets on the wall. Can you guess what animals they're making?",
                "They bake cookies with Tom's mom and enjoy the warm, sweet smell.",
                "At the end of the day, Tom smiles. Rainy days can be fun too!"
            ],
            description: "When rain ruins Tom's outdoor plans, he discovers creative ways to have fun indoors with friends.",
            categories: ["creativity", "weather", "adaptation"],
            readingTimeMin: 6
        },
        {
            title: "Tom Tries New Food",
            author: "Daniel Morrison",
            illustrator: "Lisa Chen",
            bookNumber: 5,
            texts: [
                "Tom loves pizza and ice cream. He eats them all the time!",
                "Today, Tom's mom makes something new for dinner. It's green and looks different!",
                "'I don't like it,' says Tom, even though he hasn't tried it yet.",
                "Mom explains that it's broccoli. 'It helps you grow strong!' she says.",
                "Tom's friend Ben comes over. 'Broccoli is my favorite!' he says and takes a big bite.",
                "Tom is surprised. Maybe broccoli isn't so bad? He decides to try one small piece.",
                "Tom takes a bite. The broccoli is crunchy and tastes better than he expected!",
                "Tom learns that trying new foods can be an adventure. What new food will you try?"
            ],
            description: "Tom discovers the joy of trying new foods when he overcomes his fear of broccoli.",
            categories: ["healthy habits", "trying new things", "food"],
            readingTimeMin: 5
        }
    ];

    // Process each ebook template to create the final ebook objects
    for (const template of ebookTemplates) {
        try {
            const { texts, categories, author, illustrator, ...baseFields } = template;
            
            // Create the pages array
            const pages = generatePages(texts);
            
            // Create the ebook
            await prisma.ebook.create({
                data: {
                    ...baseFields,
                    content: JSON.stringify({ 
                        pages
                    }),
                    difficulty: "BEGINNER",
                    isActive: true,
                    author,
                    illustrator,
                    categories: categories.join(', ')
                }
            });
            
            console.log(`Created ebook: ${baseFields.title}`);
        } catch (error) {
            console.error(`Failed to create ebook: ${template.title}`, error);
        }
    }

    console.log('Database seeded with 5 detailed ebooks for Talking Tom!');
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
