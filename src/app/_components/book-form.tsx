"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { DataTable } from "./book-data-table";
import { columns } from "./book-columns";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string(),
  subject: z.string(),
  author: z.string(),
  price: z.string(),
  publishedAt: z.string(),
});

const BookForm = () => {
  const utils = api.useUtils();
  const { toast } = useToast();
  const { data } = api.book.books.useQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      author: "",
      price: "",
      publishedAt: "",
    },
  });
  const router = useRouter();
  const { mutate: createBook } = api.book.create.useMutation({
    onSuccess: async() => {
      await utils.book.invalidate();
      toast({
        title: "Book created sucessfully",
      });
      router.refresh();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, subject, author, price, publishedAt } = values;
    createBook({
      title,
      subject,
      author,
      price: parseInt(price),
      publishedAt: new Date(publishedAt),
    });
  }
  return (
    <div className="h-full w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormDescription>This is the book title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="subject" {...field} />
                </FormControl>
                <FormDescription>This is the book subject.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="author" {...field} />
                </FormControl>
                <FormDescription>This is your book author.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="price" {...field} />
                </FormControl>
                <FormDescription>This is your books price.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="published at" {...field} />
                </FormControl>
                <FormDescription>
                  This is your books date of publication.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>{data && <DataTable columns={columns} data={data} />}</div>
    </div>
  );
};

export default BookForm;
