import BookForm from "./_components/book-form";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-20">
      <h1 className="text-4xl font-semibold">Book Creation Form</h1>
      <BookForm />
    </div>
  );
}
