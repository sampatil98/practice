let salary=document.getElementById("salary");
let joblocation=document.getElementById("location");
let description=document.getElementById("description");
let title=document.getElementById("title");
let companey=document.getElementById("companey");
let form=document.getElementById("form");

let data=JSON.parse(localStorage.getItem("details"));
console.log(data);


    salary.innerText=` ${data.Salary}K /month`;
    joblocation.innerText=data.Location;
    description.innerText=data.Description;
    title.innerText=data.Title;
    companey.innerText=data.Company;

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    alert("Applied Successfully");
    window.location.href="/dashbord.html";
})