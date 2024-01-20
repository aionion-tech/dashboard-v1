import SignupForm from "./components/signupForm";

export default async function Signin() {
  return (
    <main className="p-8 flex-grow flex">
      <section className="flex-grow">
        <SignupForm />
      </section>
    </main>
  );
}
