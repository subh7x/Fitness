const $=id=>document.getElementById(id);
const KEY="fitday_v2";
const plans=[
 {name:"Full Body Foundation",duration:"25–35 min",hero:"squats",ex:[
  ["squats","Bodyweight Squats","3 sets × 12 reps","Stand tall → hips back → knees track over toes → stand."],
  ["pushups","Push-Ups","3 sets × 8–12 reps","Hands under shoulders → lower chest → push back up. Use knees if needed."],
  ["lunges","Reverse Lunges","3 sets × 8 each leg","Step back → lower under control → push through front heel."],
  ["plank","Plank","3 sets × 20–40 sec","Elbows under shoulders → brace core → keep body straight."]
 ]},
 {name:"Upper Body",duration:"25–35 min",hero:"pushups",ex:[
  ["pushups","Push-Ups","3 sets × 8–12 reps","Keep your body straight and lower your chest with control."],
  ["plank","Shoulder Taps","3 sets × 10 each side","From a high plank, tap opposite shoulder without rocking hips."],
  ["pushups","Close-Grip Push-Ups","3 sets × 6–10 reps","Keep elbows closer to your body as you lower and press."]
 ]},
 {name:"Lower Body",duration:"25–35 min",hero:"squats",ex:[
  ["squats","Bodyweight Squats","3 sets × 12–15 reps","Sit hips back, keep chest tall, then drive through your feet."],
  ["lunges","Reverse Lunges","3 sets × 8 each leg","Take a controlled step back and keep the front heel grounded."],
  ["glutebridge","Glute Bridges","3 sets × 12–15 reps","Squeeze glutes at the top and lower slowly."]
 ]},
 {name:"Active Recovery",duration:"20–30 min",hero:"glutebridge",ex:[
  ["glutebridge","Glute Bridges","2 sets × 15 reps","Move slowly and squeeze your glutes at the top."],
  ["plank","Easy Plank","2 sets × 20 sec","Brace gently and breathe normally."],
  ["lunges","Easy Reverse Lunges","2 sets × 8 each leg","Use a comfortable range of motion and move slowly."]
 ]},
 {name:"Full Body Strength",duration:"30–40 min",hero:"lunges",ex:[
  ["squats","Squats","3 sets × 12 reps","Brace your core, sit back, and stand tall."],
  ["pushups","Push-Ups","3 sets × 8–12 reps","Keep elbows controlled and body straight."],
  ["lunges","Reverse Lunges","3 sets × 8 each leg","Step back softly and drive up through the front foot."],
  ["plank","Plank","3 sets × 30 sec","Keep ribs down and squeeze your core."]
 ]},
 {name:"Conditioning",duration:"20–30 min",hero:"mountain",ex:[
  ["mountain","Mountain Climbers","3 rounds × 20 sec","From a strong plank, alternate knees toward your chest."],
  ["squats","Squat to Reach","3 sets × 12 reps","Squat, stand, and reach overhead."],
  ["plank","Plank","3 sets × 30 sec","Keep hips level and breathe steadily."]
 ]},
 {name:"Rest & Mobility",duration:"15–25 min",hero:"glutebridge",ex:[
  ["glutebridge","Gentle Glute Bridge","2 sets × 12 reps","Slow, comfortable reps only."],
  ["lunges","Gentle Lunges","2 sets × 6 each leg","Use a shallow range if needed."],
  ["plank","Easy Plank","2 sets × 20 sec","Stop if you feel pain; focus on relaxed breathing."]
 ]}
];
const proteinOptions={vegetarian:[["paneer","Paneer"],["lentils","Dal"],["curd","Curd"]],nonVegetarian:[["chicken","Chicken"],["fish","Fish"],["eggs","Eggs"]],vegan:[["tofu","Tofu"],["lentils","Dal"],["chickpeas","Chickpeas"]]};
const state=JSON.parse(localStorage.getItem(KEY)||'{"day":0,"completed":[],"diet":"vegetarian","protein":"paneer","carb":"rice","theme":"light"}');

function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function dateText(){return new Intl.DateTimeFormat(undefined,{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date())}
function populateProtein(){const opts=proteinOptions[$("diet").value];$("protein").innerHTML=opts.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join(""); if(opts.some(x=>x[0]===state.protein))$("protein").value=state.protein;else{$("protein").value=opts[0][0];state.protein=opts[0][0]}}
function mealData(){
 const p=$("protein").selectedOptions[0]?.text||"Paneer", c=$("carb").selectedOptions[0]?.text||"Rice";
 return [
  ["🌅","Breakfast",`Oats + ${p} + fruit`,`8:00 AM • ~450 kcal`],
  ["☀️","Lunch",`${p} curry + ${c} + vegetables`,`1:30 PM • ~700 kcal`],
  ["🌙","Dinner",`${p} + ${c} + salad`,`8:00 PM • ~650 kcal`],
  ["🥜","Snack","Fruit + nuts / protein-rich snack","5:00 PM • ~200 kcal"]
 ]}
function render(){
 const plan=plans[state.day];
 $("todayTitle").textContent=plan.name;
 $("todayDate").textContent=dateText();
 $("dayNumber").textContent=`Day ${state.day+1} of 7`;
 $("workoutName").textContent=plan.name;
 $("workoutDuration").textContent=plan.duration;
 $("workoutHero").src=`assets/${plan.hero}.svg`;
 $("workoutHero").alt=plan.name;
 $("exerciseList").innerHTML=plan.ex.map((e,i)=>`<article class="exercise"><img src="assets/${e[0]}.svg" alt="${e[1]}"><div><h3>${i+1}. ${e[1]}</h3><p>${e[3]}</p><div class="sets">${e[2]}</div></div></article>`).join("");
 $("mealList").innerHTML=mealData().map(m=>`<article class="meal"><div class="mealIcon">${m[0]}</div><div><h3>${m[1]}</h3><p>${m[2]}</p><strong>${m[3]}</strong></div></article>`).join("");
 const done=state.completed.includes(state.day);
 const pct=done?100:0;
 $("dayProgressBar").style.width=pct+"%"; $("progressText").textContent=pct+"% complete";
 $("completeWorkout").textContent=done?"✓ Workout Completed":"✓ Mark Workout Complete"; $("completeWorkout").disabled=done;
 $("nextTitle").textContent=state.day<6?`Day ${state.day+2} • Next`:"🎉 7-Day Plan Complete";
 $("nextHint").textContent=state.day<6?"Finish today's workout to unlock the next day.":"You completed all 7 days.";
 $("nextDay").disabled=!done || state.day>=6;
 $("nextDay").textContent=state.day<6?"Next Day →":"Completed";
 $("diet").value=state.diet; populateProtein(); $("carb").value=state.carb;
}
$("completeWorkout").onclick=()=>{if(!state.completed.includes(state.day)){state.completed.push(state.day);save();render()}};
$("nextDay").onclick=()=>{if(state.day<6&&state.completed.includes(state.day)){state.day++;save();render();window.scrollTo({top:0,behavior:"smooth"})}};
$("diet").onchange=()=>{state.diet=$("diet").value;populateProtein();state.protein=$("protein").value;save();$("status").textContent="Diet changed. Tap Apply Today's Food."};
$("apply").onclick=()=>{state.diet=$("diet").value;state.protein=$("protein").value;state.carb=$("carb").value;save();render();$("status").textContent="Today's meals updated successfully."};
$("reset").onclick=()=>{if(confirm("Reset all 7-day progress and food choices?")){localStorage.removeItem(KEY);location.reload()}};
$("themeBtn").onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("dark",state.theme==="dark");$("themeBtn").textContent=state.theme==="dark"?"☀️":"🌙";save()};
if(state.theme==="dark")document.body.classList.add("dark");$("themeBtn").textContent=state.theme==="dark"?"☀️":"🌙";
render();
