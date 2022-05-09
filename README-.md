# Flashcard Maker

### Make an app able to create custom and randomized flashcards and save the sets to localstorage for the consumer.

Will be built in React.js and use Bootstrap.

# Possiable component structure.

- App
- Header
  - SavedMenu
    - SavedFlashcards
- FlashcardDisplay

  - FlashcardInputForm

- DisplayedFlashcard
- UI
  - Card
  - Input
  - Button
  - ListItem
  - Textarea

# Component Description

## Header

    Has an <h1> title which also displays the name of your flashcard set when one is loaded.
    Containes a hamburger menu which drops a list of your saved flashcard sets.

## SavedMenu

    Contains a list of your saved flashcard sets
    * Contains UI Components
        1. Button

## SavedFlashCards

    List Items of the saved flashcards
    * Contains UI Components
        1. Button
        2. ListItem

## FlashcardDisplay

    Displays the Flashcards as you build them via the FlashcardInputForm component.

## FlashcardInputForm

    Is the form used to build the flashcards
    * Contains UI Components
        1. Input
        2. Button
        3. Textarea

## DisplayedFlashCard

    After you initiate a flashcard showing this component displays. Flashcard flips on click and after another click it moves to the next flash card.
