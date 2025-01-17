import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <h2>Viva Santana!</h2>
        <Link href="/novarota">Rota1</Link>
        <br />
        <br />
        <a href="/novarota">Rota 1, jeito antigo</a>
      </div>
    </div>
  );
}

export function NewComponent() {
  return (
    <div>
      <div>
        <h1>Novo componente</h1>
      </div>
    </div>
  );
}
