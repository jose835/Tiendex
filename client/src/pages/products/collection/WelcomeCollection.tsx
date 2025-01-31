import Button from "../../../components/forms/Button";

export default function WelcomeCollection() {
  return (
    <section className="h-full">
      <header className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-secondary">Colecciones</h2>
      </header>
      <main className="border flex items-center justify-center min-h-[70%] bg-white border-gray-300 shadow-sm rounded-lg">
        <div className="w-[40%] flex flex-col justify-center items-center">
          <img src="/images/any-collections.svg" />
          <h3 className="text-[15px] font-semibold mt-2 text-secondary">Agrupa tus productos en categorías</h3>
          <p className="text-center text-[13px] mt-1 font-normal text-primary">Utiliza colecciones para organizar tus productos por categorías y galerías para tu tienda online.</p>
          <Button style="secondary" name="Crear colección" className="bg-primary text-white my-5" />
        </div>
      </main>
      <footer className="flex justify-center items-center mt-4">
        <span className="font-medium  inline-block text-secondary/80 text-sm">Mas información sobre las <span className="text-blueprimary hover:text-bluesecondary underline cursor-pointer">colecciones</span></span>
      </footer>
    </section>
  )
}
