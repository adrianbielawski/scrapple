import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      //Languages
      "English" : "English",
      "Polski" : "Polish",
      //Auth
      "e-mail" : "e-mail",
      "password" : "password",
      "Don't have an account" : "Don't have an account? <1>Create new account here!</1>",
      "user name" : "user name",
      "Logout" : "Logout",
      "Logged in as" : "Logged in as: {{name}}",
      //MainMenu
      "Game ID" : "Game ID",
      "You have joined the game" : "You have joined the game!",
      "Please wait until game started" : "Please wait until game started",
      //GameMenu
      "Language" : "Language",
      "Player's time limit" : "Player's time limit",
      "Add player" : "Add player",
      "Player" : "Player",
      //Game
      "Game finished" : "Game finished",
      "Please wait until points of unused letters will be substracted" : "Please wait until points of unused letters will be substracted",
      "Check your word" : "Check your word",
      "Add points" : "Add points",
      "ItsTurnNow" : "It is <1>{{playerName}}</1>'s turn now",
      //PlayerStats
      "Current score" : "Current score",
      "All points" : "All points",
      "Best score" : "Best score",
      "Round" : "Round",
      "points" : {
        "key": "point",
        "key_plural": "points",
      },
      //Side menu
      "Menu" : "Menu",
      "Game id" : "Game id",
      "My account" : "My account",
      "Account settings" : "Account settings",
      "Games history" : "Games history",
      "Date" : "Date",
      "fromNum" : "from {{allGames}}",
      "Played in lang" : "Language: {{lang}}",
      "Time limit" : "Time limit: {{time}}",
      "No time limit" : "No time limit",
      "enter new name" : "enter new name",
      "enter new password" : "enter new password",
      "repeat new password" : "repeat new password",
      "Change profile image" : "Change profile image",
      "Quit this game" : "Quit this game",
      //SubtractPoints
      "Subtract points of unused letters" : "Subtract points of unused letters",
      //GameSummary
      "Game results" : "Game results",
      "Exit" : "Exit",
      "1st" : "1st",
      "2nd" : "2nd",
      "3rd" : "3rd",
      "4th" : "4th",
      "place" : "{{place}} place",
      "Total" : "Total: {{total}}",
      "Best score" : "Best score: {{best}}",
      "Game continues!" : "Game continues!",
      "Please wait until settings will be changed" : "Please wait until settings will be changed",
      //Alert
      "Player exists": "Player with name {{player}} already exists",
      "Please type in player's name" : "Please type in player's name",
      "Max 4 players" : "Max 4 players",
      "Please add at least 2 players" : "Please add at least 2 players",
      "Minimum player's time limit is 1 min" : "Minimum player's time limit is 1 min",
      "You can't remove game admin" :"You can't remove game admin",
      "You can't quit this game, 2 players is required" : "You can't quit this game, 2 players is required",
      "Points value must be positive integer" : "Points value must be positive integer",
      "Are you sure you want to quit this game" : "Are you sure you want to quit this game?",
      "Are you sure you want to change your password" : "Are you sure you want to change your password",
      "Please enter new password" : "Please enter new password",
      "Please repeat new password" : "Please repeat new password",
      "Passwords doesn't match" : "Passwords doesn't match",
      "Are you sure you want to change your name to" : "Are you sure you want to change your name to {{newName}}",
      "Name changed successfully" : "Name changed successfully",
      "Are you sure you want to finish this game?" : "Are you sure you want to finish this game?",
      "Games are restricted to 4 players max" : "Games are restricted to 4 players max",
      "Please type in game ID" : "Please type in game ID",
      "Something went wrong, please check game ID" : "Something went wrong, please check game ID",
      'Something went wrong' : 'Something went wrong, please check your internet connection and try again',
      "Welcome" : "Welcome, {{name}}! Please check your inbox to finish registration.",
      "This account is not verified" : "This account is not verified. Please check your inbox to finish registration.",
      //Buttons
      "Finish the game" : "Finish the game",
      "Yes" : "Yes",
      "No" : "No",
      "Play" : 'Play',
      "Continue" : "Continue",
      "Play again" : "Play again",
      "Play again with new settings" : "Play again with new settings",
      "Select photo" : "Select photo",
      "Change photo" : "Change photo",
      "Cancel" : "Cancel",
      "Confirm" : "Confirm",
      "Change name" : "Change name",
      "Change password" : "Change password",
      "Close" : "Close",
      "Login" : "Login",
      "Create account" : "Create account",
      "Create new game" : "Create new game",
      "Join the game" : "Join the game",
      "Show two-letter words" : "Show two-letter words",
      "Hide two-letter words" : "Hide two-letter words",
    }
  },
  pl: {
    translation: {
      //Languages
      "English" : "Angielski",
      "Polski" : "Polski",
      //Auth
      "e-mail" : "e-mail",
      "password" : "hasło",
      "Don't have an account" : "Nie masz konta? <1>Zarejestruj się tutaj!</1>",
      "user name" : "imię",
      "Logout" : "Wyloguj",
      "Logged in as" : "Zalogowany jako: {{name}}",
      //MainMenu
      "Game ID" : "Numer gry",
      "You have joined the game" : "Dołączyłeś do gry!",
      "Please wait until game started" : "Poczekaj, aż gra się rozpocznie",
      //GameMenu
      "Language" : 'Język',
      "Player's time limit" : 'Limit czasu',
      "Add player" : 'Dodaj Gracza',
      "Player" : 'Gracz',
      //Game
      "Game finished" : "Gra zakończona",
      "Please wait until points of unused letters will be substracted" : "Poczekaj, aż wartość pozostałych liter zostanie odjęta",
      "Check your word" : "Sprawdź słowo",
      "Add points" : "Dodaj punkty",
      "ItsTurnNow" : "Teraz gra <1>{{playerName}}</1>",
      //PlayerStats
      "Current score" : "Suma punktów",
      "All points" : "Punkty",
      "Best score" : "Nalepszy wynik",
      "Round" : "Runda",
      "points" : {
        "key_0": "punkt",
        "key_1": "punkty",
        "key_2": "punktów",
      },
      //Side menu
      "Menu" : "Menu",
      "Game id" : "Numer gry",
      "My account" : "Moje konto",
      "Account settings" : "Ustawienia konta",
      "Games history" : "Historia gier",
      "Date" : "Data",
      "fromNum" : "z {{allGames}}",
      "Played in lang" : "Język: {{lang}}",
      "Time limit" : "Limit czasu: {{time}}",
      "No time limit" : "Bez limitu czasu",
      "enter new name" : "wprowadź nowe imię",
      "enter new password" : "wprowadź nowe haslo",
      "repeat new password" : "powtórz hasło",
      "Change profile image" : "Zmień zdjęcie profilowe",
      "Quit this game" : "Quit this game",
      //SubtractPoints
      "Subtract points of unused letters" : "Odejmij wartość pozostałych liter",
      //GameSummary
      "Game results" : "Wyniki Gry",
      "Exit" : "Wyjdź",
      "1st" : "Pierwsze",
      "2nd" : "Drugie",
      "3rd" : "Trzecie",
      "4th" : "Czwarte",
      "place" : "{{place}} miejsce",
      "Total" : "Wynik: {{total}}",
      "Best score" : "Najlepszy wynik: {{best}}",
      "Game continues!" : "Kontynuujemy grę!",
      "Please wait until settings will be changed" : "Poczekaj, aż ustawienia gry zostaną zmienione",
      //Alert
      "Player exists" : "Gracz o imieniu {{player}} już istnieje",
      "Please type in player's name" : "Proszę podać imię gracza",
      "Max 4 players" : "Maksymalnie 4 graczy",
      "Please add at least 2 players" : "Proszę dodać co najmniej 2 graczy",
      "Minimum player's time limit is 1 min" : "Minimalny limit czasu to 1 min",
      "You can't remove game admin" :"Nie możesz usunąć administratora gry",
      "You can't quit this game, 2 players is required" : "Nie możesz wyjść z tej gry, gra wymaga dwuch graczy",
      "Points value must be positive integer" : "Wprowadzona wartość musi byc całkowitą liczbą dodatnią",
      "Are you sure you want to quit this game" : "Jesteś pewien, że chcesz wyjść z tej gry?",
      "Are you sure you want to change your password" : "Jesteś pewien, że chcesz zmienić hasło",
      "Please enter new password" : "Proszę podać nowe hasło",
      "Please repeat new password" : "Proszę powtórzyć hasło",
      "Passwords doesn't match" : "Podane hasła nie są takie same",
      "Are you sure you want to change your name to" : "Jesteś pewien, że chcesz zmienić imię na {{newName}}",
      "Name changed successfully" : "Imię zostało zmienione",
      "Are you sure you want to finish this game?" : "Jesteś pewien, że chcesz zakończyć grę?",
      "Games are restricted to 4 players max" : "Gry są ograniczone do 4 graczy",
      "Please type in game ID" : "Proszę podać numer gry",
      "Something went wrong, please check game ID" : "Coś nie zadziałało, sprawdź numer gry",
      'Something went wrong' : 'Coś nie zadziałało, sprawdź połączenie z internetem i spróbuj ponownie',
      "Welcome" : "Witaj, {{name}}! Sprawdź e-mail aby dokończyć rejestrację.",
      "This account is not verified" : "Konto nie zostało zweryfikowane. Sprawdź e-mail aby dokończyć rejestrację.",
      //Buttons
      "Finish the game" : "Zakończ grę",
      "Yes" : "Tak",
      "No" : "Nie",
      "Play" : 'Start',
      "Continue" : "Kontynuuj",
      "Play again" : "Zagraj ponownie",
      "Play again with new settings" : "Zagraj ponownie ze zmienionymi ustawieniami",
      "Select photo" : "Wybierz zdjęcie",
      "Change photo" : "Zmień zdjęcie",
      "Cancel" : "Wróć",
      "Confirm" : "Potwierdź",
      "Change name" : "Zmień imię",
      "Change password" : "Zmień hasło",
      "Close" : "Zamknij",
      "Login" : "Zaloguj",
      "Create account" : "Zarejestruj",
      "Create new game" : "Utwórz nową grę",
      "Join the game" : "Dołącz do gry",
      "Show two-letter words" : "Pokaż słowa dwuliterowe",
      "Hide two-letter words" : "Ukryj słowa dwuliterowe",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;