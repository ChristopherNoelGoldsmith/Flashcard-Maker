import styles from "./MainForm.module.css";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
const MainForm = () => {
  return (
    <Card>
      <form className="container row my-5 mx-2" action="">
        <h2 className="my-3">Construct Your Flashcard!</h2>
        <Input
          label="Flashcard Name:"
          type="text"
          placeholder="Enter the title here"
          className="m-1"
        ></Input>
        <TextArea
          label="Card Front (QUESTION)"
          className="col-xs m-1"
        ></TextArea>
        <TextArea label="Card Back (ANSWER)" className="col-xs m-1"></TextArea>
        <Button
          className="btn btn-primary"
          type="submit"
          label="Create"
        ></Button>
      </form>
    </Card>
  );
};

export default MainForm;
