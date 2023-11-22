
let form=document.getElementById("form");
let container=document.getElementById("container")
let Base_URL="http://localhost:3000";
let token=localStorage.getItem("token");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let data=form.inputfield.value;
    getdata(data);

});

window.addEventListener("load",()=>{
    fetchdata();
});

function getdata(data){
    let obj={
        query:data
    }
    fetch(`${Base_URL}/job/search`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data);
        if(data){
            showdata(data.data);
        }
    })
}

function fetchdata(){

    fetch(`${Base_URL}/job`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        if(data){
            showdata(data.data);
        }
    })
};

function showdata(data){

    container.innerHTML=null;

    data.forEach(ele => {

        let card=document.createElement("div");
        card.setAttribute("class","card");

        card.addEventListener("click",()=>{
            localStorage.setItem("details",JSON.stringify(ele));
            window.location.href="/apply.html"
        })


        let div1=document.createElement("div");
        div1.setAttribute("class","align-div");

        let img1=document.createElement("img");
        img1.setAttribute("class","set-img");
        img1.src="../img/company.png";

        let Company=document.createElement("h2");
        Company.setAttribute("class","companey-name");
        Company.innerText=ele.Company;

        div1.append(img1,Company);



        let div2=document.createElement("div");
        div2.setAttribute("class","align-div");

        let img2=document.createElement("img");
        img2.setAttribute("class","set-img");
        img2.src="../img/job.png";

        let Title=document.createElement("p");
        Title.setAttribute("class","job-Title");
        Title.innerText=ele.Title;

        div2.append(img2,Title);



        let div3=document.createElement("div");
        div3.setAttribute("class","align-div");

        let img3=document.createElement("img");
        img3.setAttribute("class","set-img");
        img3.src="../img/location.png";

        let Location=document.createElement("p");
        Location.setAttribute("class","job-Location");
        Location.innerText=ele.Location;

        div3.append(img3,Location)



        let div4=document.createElement("div");
        div4.setAttribute("class","align-div");

        let img4=document.createElement("img");
        img4.setAttribute("class","set-img");
        img4.src="../img/payment.png";

        let Salary=document.createElement("p");
        Salary.setAttribute("class","Salary");
        Salary.innerText=ele.Salary+"K /month";

        div4.append(img4,Salary);


        card.append(div1,div2,div3,div4);
        container.append(card);


        
    });

}