var prediction1=""
var prediction2=""
Webcam.set({
    width:350,height:300,image_format:'png',png_quality:90
})
camera=document.getElementById("camera")
Webcam.attach('#camera')
function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="selfieimage" src=" '+data_uri+' ">'
    })
}
console.log('ml5.version',ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6SCDkaBPl/model.json',modelLoaded)
function modelLoaded(){
    console.log('modelloaded')
}
function speak(){
    synth=window.speechSynthesis
    speakdata1="the first prediction is"+prediction1
    speakdata2="the second prediction is"+prediction2
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2)
    synth.speak(utterthis)
}
function check(){
    img=document.getElementById("selfieimage")
    classifier.classify(img,gotresult)
}
function gotresult(error,results){
if (error) {
  console.log(error)  
} else{
    console.log(results)
   document.getElementById("result1").innerHTML=results[0].label
   document.getElementById("result2").innerHTML=results[1].label
   prediction1=results[0].label
   prediction2=results[1].label
   speak()
   if (results[0].label=="happy") {
      document.getElementById("emoji1").innerHTML="😄"
   }
   if (results[1].label=="happy") {
    document.getElementById("emoji2").innerHTML="😄"

 }
 if (results[0].label=="sad") {
    document.getElementById("emoji1").innerHTML="😕"
 }
 if (results[1].label=="sad") {
  document.getElementById("emoji2").innerHTML="😕"

}
if (results[0].label=="angry") {
    document.getElementById("emoji1").innerHTML="😠"
 }
 if (results[1].label=="angry") {
  document.getElementById("emoji2").innerHTML="😠"

}
}
}