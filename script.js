const $=id=>document.getElementById(id);
const KEY="fitday_fixed_v1";
const days=[
 {focus:"Full Body",workout:"Squats",meta:"3 × 12",img:"squats.png",steps:["Stand with feet about shoulder-width apart.","Keep chest up and brace your core.","Push hips back and bend your knees.","Lower until comfortable, keeping knees tracking over toes.","Drive through your feet to stand tall."]},
 {focus:"Upper Body",workout:"Push-ups",meta:"3 × 10",img:"pushups.png",steps:["Start in a high plank with hands under shoulders.","Keep head, hips and heels in one line.","Lower your chest slowly toward the floor.","Keep elbows slightly angled back.","Push the floor away and return to the start."]},
 {focus:"Legs",workout:"Lunges",meta:"3 × 10",img:"lunges.png",steps:["Stand tall with feet hip-width apart.","Step one foot forward.","Bend both knees under control.","Keep your front knee tracking over your foot.","Push through the front foot and switch sides."]},
 {focus:"Core",workout:"Plank",meta:"3 × 30 sec",img:"plank.png",steps:["Place forearms under your shoulders.","Extend both legs behind you.","Keep your body in a straight line.","Brace your stomach and squeeze your glutes.","Breathe steadily for the full hold."]},
 {focus:"Glutes",workout:"Glute Bridge",meta:"3 × 12",img:"glutebridge.png",steps:["Lie on your back with knees bent.","Place feet flat and close to your hips.","Brace your core.","Squeeze your glutes and lift your hips.","Pause briefly, then lower with control."]},
 {focus:"Cardio",workout:"Mountain Climbers",meta:"3 × 20",img:"mountain.png",steps:["Start in a high plank.","Brace your core and keep shoulders over hands.","Drive one knee toward your chest.","Return it and switch legs.","Move at a controlled pace while breathing steadily."]},
 {focus:"Recovery",workout:"Full Body Mobility",meta:"10–15 min",img:"glutebridge.png",steps:["Walk gently for 2 minutes.","Do slow bodyweight squats for mobility.","Perform shoulder circles and arm swings.","Stretch calves, hips and hamstrings gently.","Finish with slow breathing and hydration."]}
];
const mealBase=[
 ["Breakfast","Oats + curd + fruit","Balanced start to the day"],
 ["Lunch","Rice + dal + vegetables","Protein, carbs and fiber"],
 ["Snack","Roasted chana + fruit","Simple high-fiber snack"],
 ["Dinner","Chapati + protein + vegetables","Light, balanced dinner"]
];
let state=JSON.parse(localStorage.getItem(KEY)||'{"day":0,"done":false,"diet":"Vegetarian","protein":"Paneer","carb":"Rice","dark":false}');
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function render(){
 const d=days[state.day];
 $("dayTitle").textContent=`Day ${state.day+1} of 7`;
 $("focus").textContent=d.focus;
 $("progressFill").style.width=((state.day+1)/7*100)+"%";
 $("workoutTitle").textContent=d.workout;
 $("workoutMeta").textContent=d.meta;
 $("workoutImage").src="./assets/"+d.img;
 $("workoutImage").alt=d.workout;
 $("steps").innerHTML=d.steps.map(x=>`<li>${x}</li>`).join("");
 $("completeBtn").disabled=state.done;
 $("completeBtn").textContent=state.done?"✓ Workout Completed":"✓ Mark Workout Complete";
 $("nextBtn").disabled=!state.done || state.day>=6;
 $("status").textContent=state.done?(state.day<6?"Workout complete. Next day is unlocked.":"7-day plan completed! 🎉"):"Complete today's workout to unlock the next day.";
 $("diet").value=state.diet;$("protein").value=state.protein;$("carb").value=state.carb;
 renderMeals();
}
function renderMeals(){
 let protein=state.protein, carb=state.carb;
 let diet=state.diet;
 let p=protein;
 if(diet==="Vegetarian" && ["Chicken","Eggs"].includes(p))p="Paneer";
 if(diet==="Vegan" && !["Tofu","Lentils"].includes(p))p="Tofu";
 const meals=[
  ["Breakfast",`${carb==="Oats"?"Oats":"Vegetable "+carb} + fruit`,"Energy + fiber"],
  ["Lunch",`${carb} + ${p} + mixed vegetables`,"Main protein meal"],
  ["Snack","Roasted chana + fruit","Simple snack"],
  ["Dinner",`Chapati + ${p} + salad`,"Balanced evening meal"]
 ];
 $("meals").innerHTML=meals.map(m=>`<div class="meal"><b>${m[0]}</b><div>${m[1]}</div><span>${m[2]}</span></div>`).join("");
}
$("completeBtn").onclick=()=>{state.done=true;save();render()};
$("nextBtn").onclick=()=>{if(state.done&&state.day<6){state.day++;state.done=false;save();render();window.scrollTo({top:0,behavior:"smooth"})}};
$("applyBtn").onclick=()=>{state.diet=$("diet").value;state.protein=$("protein").value;state.carb=$("carb").value;save();render();$("status").textContent="Kitchen ingredients updated for today."};
$("resetBtn").onclick=()=>{if(confirm("Reset the 7-day plan and start again from Day 1?")){state={day:0,done:false,diet:"Vegetarian",protein:"Paneer",carb:"Rice",dark:false};save();render()}};
$("themeBtn").onclick=()=>{state.dark=!state.dark;document.body.classList.toggle("dark",state.dark);save();$("themeBtn").textContent=state.dark?"☀":"☾"};
document.body.classList.toggle("dark",state.dark);$("themeBtn").textContent=state.dark?"☀":"☾";render();
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
