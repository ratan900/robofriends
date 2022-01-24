import Card from "./Card";

const CardList = ({ robots }) => {
  return (
    <div className="tc flex flex-wrap">
      {robots.map((user, i) => {
        return (
          <Card
            key={i}
            id={robots[i].id}
            name={robots[i].name}
            userName={robots[i].username}
            email={robots[i].email}
          ></Card>
        );
      })}
    </div>
  );
};

export default CardList;
