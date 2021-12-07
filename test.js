let scores = [0,0,0,0,0,0];

class Question
{
    constructor(text,answers)
    {
        this.text = text;
        this.answers = answers;
    }

}

class Answer
{
    constructor(text,value)
   {
       this.text = text;
       this.value = value;
   }
}
const questions =
[
   new Question("What do you value the most in cars? ",
   [
       new Answer("Luxury look and comfort", 1),
       new Answer("Ability to withstand any obstacles", 2),
       new Answer("Speed", 3),
       new Answer("Universal use", 4),
       new Answer("Seating and storing capacity", 5),
       new Answer("Cool design with modifications", 6)
   ]),

   new Question("Where do you live?",
   [
       new Answer("Big City", 1),
       new Answer("Wilderness", 2),
       new Answer("Just across charming racing track", 3),
       new Answer("Outback", 4),
       new Answer("Small town", 5),
       new Answer("Near serpentine drift road", 6)
   ]),

   new Question("How do you spend your weekends?",
   [
       new Answer("Playing poker in VIP country club", 1),
       new Answer("Concurring the nature", 2),
       new Answer("Racing", 3),
       new Answer("Little bit of everything", 4),
       new Answer("Shopping or spending time with family", 5),
       new Answer("Tuning my car", 6)
   ]),


   new Question("How many people should your car hold?",
   [
       new Answer("Only me", 6),
       new Answer("Only me and my driver", 1),
       new Answer("Only me and my hunting dog named Butch", 2),
       new Answer("Only me and my safety gear", 3),
       new Answer("Only me and my friends", 4),
       new Answer("Only me and my family", 5)
   ]),

   new Question("How much money would you agree to spend on a car? ",
   [
       new Answer("I can afford anything, my garage is already full of cars", 1),
       new Answer("I value cross-country ability, let's say 100.000$?", 2),
       new Answer("Speed=Cash, as much as possible", 3),
       new Answer("I am short on money, but for a long term car I would start saving cash", 4),
       new Answer("Enough, if this car would be perfect for me and my family", 5),
       new Answer("A lot and I would keep spending money on tuning", 6)
   ]),

   new Question("What about transport taxes?",
   [
       new Answer("Not afraid, money is not and issue", 1),
       new Answer("Catching surprised looks is worth it", 6),
       new Answer("The sound of my engine speaks for me", 3),
       new Answer("Government supports large families, transport taxes included", 5),
       new Answer("Sad but by 4WD beast would worth it", 2),
       new Answer("I would rather not pay to much...", 4)

   ]),

   new Question("How do you usually drive?",
   [
       new Answer("Speed, I am speed", 3),
       new Answer("I'm in traffic jams like everyone else", 4),
       new Answer("Safe, do not want to put me and my family in danger", 5),
       new Answer("On the handbrake entering a skid", 6),
       new Answer("With all comfort and a glass of wine", 1),
       new Answer("Bouncing on bumps", 2)

   ])
];

class Result
{
    constructor(text,image)
    {
       this.text = text;
       this.image = image;
    }
}

const results =
[
   new Result("An executive class car is suitable for you, for example Mercedes S-Class","images/mercedes.jpg"),
   new Result("You need a wild beast such as Ford F150 Raptor","images/raptor.jpg"),
   new Result("Speed is all you want and Ford Mustang will give it to you","images/mustang.jpg"),
   new Result("It seems like you want an universal, Ford Mondeo should do the trick","images/mondeo.jpg"),
   new Result("Proud family man requires a big car, try Toyota Sienna","images/sienna.jpg"),
   new Result("Wild tuning and drift/street race potential is inside Mitsubishi Lancer!","images/lancer.jpg")
];

const quizPics = ["images/quizPhoto1.jpg","images/quizPhoto2.jpg","images/quizPhoto3.jpg","images/quizPhoto4.jpg","images/quizPhoto5.jpg","images/quizPhoto6.jpg","images/quizPhoto7.jpg"]


let headElem=document.querySelector("#head");
let buttonsElem=document.querySelector("#buttons");
let pagesElem=document.querySelector("#pages");
let imgQuiz = document.querySelector(".quiz-head>img");
let currentQuestion = 0;


//Обновление теста
function Update()
{
   //Проверяем, есть ли ещё вопросы
   if(currentQuestion < questions.length)
   {
       //Если есть, меняем вопрос в заголовке
       headElem.innerHTML = questions[currentQuestion].text;
       imgQuiz.setAttribute("src",quizPics[currentQuestion]);

       //Удаляем старые варианты ответов
       buttonsElem.innerHTML = "";

       //Создаём кнопки для новых вариантов ответов
       for(let i = 0; i < questions[currentQuestion].answers.length; i++)
       {
           let btn = document.createElement("button");
           btn.className = "button";

           btn.innerHTML = questions[currentQuestion].answers[i].text;

           btn.setAttribute("index", questions[currentQuestion].answers[i].value);
           buttonsElem.appendChild(btn);
       }

       //Выводим номер текущего вопроса
       pagesElem.innerHTML = (currentQuestion + 1) + " / " + questions.length;

       //Вызываем функцию, которая прикрепит события к новым кнопкам
       Init();
   }
   else
   {
       //Если это конец, то выводим результат
       buttonsElem.innerHTML = "";
       let maxIndex = 0;
       let max = 0;
       for (let i=0;i<scores.length;i++)
       {
            if (scores[i]>max)
            {
                max = scores[i];
                maxIndex = i;
            }
       }
       imgQuiz.setAttribute("src",results[maxIndex-1].image);
       headElem.innerHTML = results[maxIndex-1].text;
       pagesElem.style.display = "none";
   }
}

function Init()
{
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");

   for(let i = 0; i < btns.length; i++)
   {
       //Прикрепляем событие для каждой отдельной кнопки
       //При нажатии на кнопку будет вызываться функция Click()
       btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index"),i); });
   }
}

function Click(index,j)
{
   currentQuestion++;
    scores[index]+=1;

   let btns = document.getElementsByClassName("button");

   //Делаем кнопки серыми
   for(let i = 0; i < btns.length; i++)
   {
       btns[i].style.background = "silver";
   }

   btns[j].style.background = "green";


   setTimeout(Update, 1000);
}
Update();