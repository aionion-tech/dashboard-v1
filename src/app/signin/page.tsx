import LoginForm from "./components/loginForm";

export default async function Signin() {
  return (
    <main className="p-8 flex-grow flex">
      <section className="flex-grow">
        <LoginForm />
      </section>
    </main>
  );
}
