import Link from "next/link";
import projects from "./projects.json";
import Layout from "../src/components/landing_page";

const Index = () => (
  <Layout
    content={
      <>
        <h2>Karunagaran</h2>
        <h2>Full-Stack Developer</h2>
        <h1>Projects</h1>
        <ul>
          {Object.entries(projects).map((value, key) => {
            console.log(value);
            return (
              <li key={key}>
                <Link href="/projects/[name]" as={"/projects/" + [value[0]]}>
                  <a>{value[1].title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    }
  />
);

export default Index;
