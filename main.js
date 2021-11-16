var predict_1 ="";
var predict_2 ="";
Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90,
});
camera = document.getElementById("camera");
Webcam.attach('#Camera');
function take_snapshot(){
Webcam.snap(function (data_uri){
document.getElementById("result").innerHTML = '<img id = "capture_image" src = "'+ data_uri + '">';
});
}
console.log('ml5version:' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WwR6J7jmu/model.json',modelLoaded);
function modelLoaded(){
console.log('modelloaded');
}
function speak(){
var synth = window.speechSynthesis;
s1 = "the first prediction is " + predict_1;
s2 = "the second prediction is" + predict_2;
var utterths = new SpeechSynthesisUtterance(s1 + s2);
synth.speak(utterths);
}
function checkie(){
img = document.getElementById('captured_image');
classifier.classify(img, gotResult);
}
function gotResult(error, results){
if(error){
console.log(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name").innerHTML = results[0].label;
document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
predict_1 = results[0].label;
predict_2 = results[1].label;
if(results[0].label == "Victory"){
document.getElementById("update_emoji").innerHTML = "&#9996;";
}
if(results[0].label == "Amazing"){
document.getElementById("update_emoji").innerHTML = "&#128076;";
}
if(results[0].label == "Thumbs Up"){
document.getElementById("update_emoji").innerHTML = "&#128077;";
}
  
if(results[1].label == "Victory"){
document.getElementById("update_emoji_2").innerHTML = "&#9996;";
}
if(results[1].label == "Amazing"){
document.getElementById("update_emoji_2").innerHTML = "&#128076;";
}
if(results[1].label == "Thumbs Up"){
document.getElementById("update_emoji_2").innerHTML = "&#128077;";
}
speak();
}
}