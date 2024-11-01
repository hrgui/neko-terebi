import Cell from "../../components/Cell/Cell";

const HomePage = () => {
  return (
    <div>
      <div className="text-body-m @asvw:mb-[16px]">Meowing for days</div>
      <div className="flex gap-4">
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
      </div>
    </div>
  );
};

export default HomePage;
