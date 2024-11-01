import Cell from "../../components/Cell/Cell";
import Collection from "../../components/Collection/Collection";

const HomePage = () => {
  return (
    <Collection header="Meowing for days">
      <Cell
        imageUrl="https://placehold.co/528x297/0000FF/FFF"
        header1="NEKO THE ROCK!"
        header2="Sub | Dub"
        header3="14+"
      />
      <Cell
        imageUrl="https://placehold.co/528x297/00FF00/FFF"
        header1="NEKO THE ROCK!"
        header2="Sub | Dub"
        header3="14+"
      />
      <Cell
        imageUrl="https://placehold.co/528x297/FF0000/FFF"
        header1="NEKO THE ROCK!"
        header2="Sub | Dub"
        header3="14+"
      />
    </Collection>
  );
};

export default HomePage;
