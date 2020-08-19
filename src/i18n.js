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
      "Login" : "Login",
      "Don't have an account" : "Don't have an account? <1>Create new account here!</1>",
      "user name" : "user name",
      "Create account" : "Create account",
      "Logout" : "Logout",
      "Logged in as" : "Logged in as: {{name}}",
      "Welcome" : "Welcome, {{name}}! Please check your inbox to finish registration.",
      "This account is not verified. Please check your inbox to finish registration." : "This account is not verified. Please check your inbox to finish registration.",
      //MainMenu
      "Game ID" : "Game ID",
      "Create new game" : "Create new game",
      "Creating new game" : "Creating new game",
      "Please wait" : "Please wait...",
      "Join the game" : "Join the game",
      "You have joined the game" : "You have joined the game!",
      "Please wait until game started" : "Please wait until game started",
      "Games are restricted to 4 players max" : "Games are restricted to 4 players max",
      "Please type in game ID" : "Please type in game ID",
      "Something went wrong, please check game ID" : "Something went wrong, please check game ID",
      'Something went wrong, please check your internet connection and try again' : 'Something went wrong, please check your internet connection and try again',
      //GameMenu
      "Language" : "Language",
      "Player's time limit" : "Player's time limit",
      "Add player" : "Add player",
      "Player" : "Player",
      "Play" : 'Play',
      "Player exists": "Player with name {{player}} already exists",
      "Please type in player's name" : "Please type in player's name",
      "Max 4 players" : "Max 4 players",
      "Create game" : "Create game",
      "Please add at least 2 players" : "Please add at least 2 players",
      "Minimum player's time limit is 1 min" : "Minimum player's time limit is 1 min",
      "Game created succesfully" : "Game created succesfully!",
      "Please wait for other players to join the game" : "Please wait for other players to join the game",
      "All players have joined the game, press start game to begin" : "All players have joined the game, press start game to begin",
      "or" : "or",
      "Start anyway" : "Start anyway",
      //Game
      "Finish the game" : "Finish the game",
      "Are you sure you want to finish this game?" : "Are you sure you want to finish this game?",
      "Game finished" : "Game finished",
      "Please wait until points of unused letters will be substracted" : "Please wait until points of unused letters will be substracted",
      //Game/Menu
      "Menu" : "Menu",
      "Game id" : "Game id",
      "My account" : "My account",
      "Account settings" : "Account settings",
      "Games history" : "Games history",
      "Date" : "Date",
      "fromNum" : "from {{allGames}}",
      "Close" : "Close",
      "Played in lang" : "Language: {{lang}}",
      "Time limit" : "Time limit: {{time}}",
      "No time limit" : "No time limit",
      //TwoLetterWords
      "Show two-letter words" : "Show two-letter words",
      "Hide two-letter words" : "Hide two-letter words",
      //WordChecker
      "Check your word" : "Check your word",
      //CurrentPlayer
      "Add points" : "Add points",
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
      //SubtractPoints
      "Points value must be positive integer" : "Points value must be positive integer",
      "Subtract points of unused letters" : "Subtract points of unused letters",
      "Continue" : "Continue",
      //GameSummary
      "Game results" : "Game results",
      "Exit" : "Exit",
      "1st" : "1st",
      "2nd" : "2nd",
      "3rd" : "3rd",
      "4th" : "4th",
      "place" : "{{place}} place",
      "Player results" : "Total: {{total}} Best score: {{best}}",
      "Play again" : "Play again",
      "Play again with new settings" : "Play again with new settings",
      "Game continues!" : "Game continues!",
      "Please wait until settings will be changed" : "Please wait until settings will be changed",
      //Alert
      "Yes" : "Yes",
      "No" : "No",
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
      "Login" : "Zaloguj",
      "Don't have an account" : "Nie masz konta? <1>Zarejestruj się tutaj!</1>",
      "user name" : "imię",
      "Create account" : "Zarejestruj",
      "Logout" : "Wyloguj",
      "Logged in as" : "Zalogowany jako: {{name}}",
      "Welcome" : "Witaj, {{name}}! Sprawdź e-mail aby dokończyć rejestrację.",
      "This account is not verified. Please check your inbox to finish registration." : "Konto nie zostało zweryfikowane. Sprawdź e-mail aby dokończyć rejestrację.",
      //MainMenu
      "Game ID" : "Numer gry",
      "Create new game" : "Utwórz nową grę",
      "Creating new game" : "Trwa tworzenie gry",
      "Please wait" : "Proszę czekać...",
      "Join the game" : "Dołącz do gry",
      "You have joined the game" : "Dołączyłeś do gry!",
      "Please wait until game started" : "Poczekaj, aż gra się rozpocznie",
      "Games are restricted to 4 players max" : "Gry są ograniczone do 4 graczy",
      "Please type in game ID" : "Proszę podać numer gry",
      "Something went wrong, please check game ID" : "Coś nie zadziałało, sprawdź numer gry",
      'Something went wrong, please check your internet connection and try again' : 'Coś nie zadziałało, sprawdź połączenie z internetem i spróbuj ponownie',
      //GameMenu
      "Language" : 'Język',
      "Player's time limit" : 'Limit czasu',
      "Add player" : 'Dodaj Gracza',
      "Player" : 'Gracz',
      "Play" : 'Start',
      "Player exists" : "Gracz o imieniu {{player}} już istnieje",
      "Please type in player's name" : "Proszę podać imię gracza",
      "Max 4 players" : "Maksymalnie 4 graczy",
      "Please add at least 2 players" : "Proszę dodać co najmniej 2 graczy",
      "Minimum player's time limit is 1 min" : "Minimalny limit czasu to 1 min",
      "Create game" : "Utwórz grę",
      "Game created succesfully" : "Gra utworzona!",
      "Please wait for other players to join the game" : "Poczekaj, aż pozostali gracze dołączą do gry",
      "All players have joined the game, press start game to begin" : "Wszyscy gracze dołączyli do gry, wciśnij start aby rozpocząć grę",
      "or" : "albo",
      "Start anyway" : "Rozpocznij grę mimo to",
      //Game
      "Finish the game" : "Zakończ grę",
      "Are you sure you want to finish this game?" : "Jesteś pewien, że chcesz zakończyć grę?",
      "Game finished" : "Gra zakończona",
      "Please wait until points of unused letters will be substracted" : "Poczekaj, aż wartość pozostałych liter zostanie odjęta",
      //Game/Menu
      "Menu" : "Menu",
      "Game id" : "Numer gry",
      "My account" : "Moje konto",
      "Account settings" : "Ustawienia konta",
      "Games history" : "Historia gier",
      "Date" : "Data",
      "fromNum" : "z {{allGames}}",
      "Close" : "Zamknij",
      "Played in lang" : "Język: {{lang}}",
      "Time limit" : "Limit czasu: {{time}}",
      "No time limit" : "Bez limitu czasu",
      //TwoLetterWords
      "Show two-letter words" : "Pokaż slowa dwuliterowe",
      "Hide two-letter words" : "Ukryj slowa dwuliterowe",
      //WordChecker
      "Check your word" : "Sprawdź słowo",
      //CurrentPlayer
      "Add points" : "Dodaj punkty",
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
      //SubtractPoints
      "Points value must be positive integer" : "Wprowadzona wartość musi byc całkowitą liczbą dodatnią",
      "Subtract points of unused letters" : "Odejmij wartość pozostałych liter",
      "Continue" : "Kontynuuj",
      //GameSummary
      "Game results" : "Wyniki Gry",
      "Exit" : "Wyjdź",
      "1st" : "Pierwsze",
      "2nd" : "Drugie",
      "3rd" : "Trzecie",
      "4th" : "Czwarte",
      "place" : "{{place}} miejsce",
      "Player results" : "Wynik: {{total}} Najlepszy wynik: {{best}}",
      "Play again" : "Zagraj ponownie",
      "Play again with new settings" : "Zagraj ponownie ze zmienionymi ustawieniami",
      "Game continues!" : "Kontynuujemy grę!",
      "Please wait until settings will be changed" : "Poczekaj, aż ustawienia gry zostaną zmienione",
      //Alert
      "Yes" : "Tak",
      "No" : "Nie",
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