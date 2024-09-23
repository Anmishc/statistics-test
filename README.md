## Statistics

## Condition: 
You need to create a React SPA web-application that counts statistical parameters on “quotes from the stock exchange” as quickly as possible.
To do this, you need to create an interface that contains buttons “Start” and “Statistics”. By clicking on “Start” you should connect to the quotes emulator at the web-socket address `wss://trade.termplat.com:8800/?password=1234` to get quotes online. When you click on the “Statistics” button, it displays on the page such statistical values: mean, standard deviation, mode (in case of multimodality only one mode is enough), median, number of lost quotes, if any, time spent on calculations. Calculations should be performed on all received data from the start moment to the current moment of pressing the “Statistics” button, the button can be pressed as many times as you like to get new results for the current time.
Format “quotes” json, fields : `{id : id_quotes, value : value_quotes}`

## Technical Requirements:
- The application should be as speed optimized as possible. When the statistics button is pressed, the response should be given within a second. For any amount of received data
- The time between pressing Start and Statistics can be very long (several days, the amount of sent data can be more than 1 trillion).
- The interface should be easy to use.
- The style of buttons should be: border exactly 1px black, background of the button is gray, at
hovering the mouse over the button the background should become white, when clicking on the button the background
should become yellow (use only CSS / SCSS for this).
- Accepted numbers do not need to be displayed.
Difficulty levels:
- Calculate mean, standard deviation, mode, median, number of lost quotes

## Our workflow

- A `main` branch is used to make a production deployment

## How to set up?

- Clone repo
- `npm i -g yarn`
- `yarn`

## How to run application?

1. Development:
    - `yarn dev`

## Branching
- `main` - production environment. Auto deploys to `anmishc.github.io/statistics-test`