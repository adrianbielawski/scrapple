import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      //GameMenu
      "Language" : "Language",
      "Player's time limit" : "Player's time limit",
      "Add player" : "Add player",
      "Player" : "Player",
      "Start game" : 'Start game',
      "Player with name {player} already exists": "Player with name {{player}} already exists",
      "Please type in player's name" : "Please type in player's name",
      "Max 4 players" : "Max 4 players",
      "Please add at least 2 players" : "Please add at least 2 players",
      "Minimum player's time limit is 1 min" : "Minimum player's time limit is 1 min",
      //Game
      "Finish the game" : "Finish the game",
      "Are you sure you want to finish this game?" : "Are you sure you want to finish this game?",
      //TwoLetterWords
      "Show two-letter words" : "Show two-letter words",
      "Hide two-letter words" : "Hide two-letter words",
      //WordChecker
      "Check your word" : "Check your word",
      //CurrentPlayer
      "add points" : "add points",
      "ItsTurnNow" : "It is <1>{{playerName}}</1>'s turn now",
      //PlayerStats
      "Current score" : "Current score",
      "All points" : "All points",
      "Best score" : "Best score",
      //RoundPoints
      "Round" : "Round",
      "points" : {
        "key": "point",
        "key_plural": "points",
      },
      //GameSummary
      "Game results" : "Game results",
      "Subtract points of unused letters" : "Subtract points of unused letters",
      "Exit" : "Exit",
      "Continue" : "Continue",
      "1st" : "1st",
      "2nd" : "2nd",
      "3rd" : "3rd",
      "" : "",
      //PlayerSummary
      "place" : "place",
      "Total" : "Total",
      "Best score" : "Best score",
      "Yes" : "Yes",
      "No" : "No",
    }
  },
  pl: {
    translation: {
      //GameMenu
      "Language" : 'Język',
      "Player's time limit" : 'Limit czasu',
      "Add player" : 'Dodaj Gracza',
      "Player" : 'Gracz',
      "Start game" : 'Start',
      "Player with name {player} already exists" : "Gracz o imieniu {{player}} już istnieje",
      "Please type in player's name" : "Proszę podać imię gracza",
      "Max 4 players" : "Maksymalnie 4 graczy",
      "Please add at least 2 players" : "Proszę dodać co najmniej 2 graczy",
      "Minimum player's time limit is 1 min" : "Minimalny limit czasu to 1 min",
      //Game
      "Finish the game" : "Zakończ grę",
      "Are you sure you want to finish this game?" : "Jesteś pewien, że chcesz zakończyć grę?",
      //TwoLetterWords
      "Show two-letter words" : "Pokaż slowa dwuliterowe",
      "Hide two-letter words" : "Ukryj slowa dwuliterowe",
      //WordChecker
      "Check your word" : "Sprawdź słowo",
      //CurrentPlayer
      "add points" : "dodaj punkty",
      "ItsTurnNow" : "Teraz gra <1>{{playerName}}</1>",
      //PlayerStats
      "Current score" : "Suma punktów",
      "All points" : "Punkty",
      "Best score" : "Nalepszy wynik",
      //RoundPoints
      "Round" : "Runda",
      "points" : {
        "key_0": "punkt",
        "key_1": "punkty",
        "key_2": "punktów",
      },
      //GameSummary
      "Game results" : "Wyniki Gry",
      "Subtract points of unused letters" : "Odejmij wartość pozostałych liter",
      "Exit" : "Wyjdź",
      "Continue" : "Kontynuuj",
      "1st" : "Pierwsze",
      "2nd" : "Drugie",
      "3rd" : "Trzecie",
      "4th" : "Czwarte",
      //PlayerSummary
      "place" : "miejsce",
      "Total" : "Wynik",
      "Best score" : "Najlepszy wynik",
      //Alert
      "Yes" : "Tak",
      "No" : "Nie",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;