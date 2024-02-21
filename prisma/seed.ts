import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function seedBooks() {
  const books = [];
  const subjects = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Biography",
    "History",
  ];
  const authors = [
    "Jane Austen",
    "William Shakespeare",
    "George Orwell",
    "J.K. Rowling",
    "Stephen King",
    "Agatha Christie",
    "J.R.R. Tolkien",
    "Leo Tolstoy",
    "Mark Twain",
    "Charles Dickens",
    "Harper Lee",
    "F. Scott Fitzgerald",
    "Emily Dickinson",
    "Ernest Hemingway",
  ];

  for (let i = 1; i <= 40; i++) {
    const title = `Book ${i}`;
    const subject = subjects[Math.floor(Math.random() * subjects.length)]!;
    const author = authors[Math.floor(Math.random() * authors.length)]!;
    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2)); // Random price between 5 and 50
    const publishedAt = new Date(
      Date.now() - Math.random() * 10 * 365 * 24 * 60 * 60 * 1000,
    ); // Random date in the past 10 years

    books.push({
      title,
      subject,
      author,
      price,
      publishedAt,
    });
  }

  return books;
}

async function main() {
  const books = await seedBooks();
  await prisma.book.createMany({
    data: books,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
