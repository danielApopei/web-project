function main() {
    const head = document.head;
    let oldText = head.innerHTML;
    let newText = oldText + `<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>` + 
    `<link rel="stylesheet" href="./css/components/sidebar.css">`;
    head.innerHTML = newText;
    let sidebar = document.getElementsByClassName("sidebar");
    if(sidebar.length == 0) {
        // add element
        sidebar = document.createElement("div");
        sidebar.classList.add("sidebar");
        let mymain = document.getElementsByTagName("main")[0];
        mymain.appendChild(sidebar);
    } else sidebar = sidebar[0];
    sidebar.innerHTML = `<div class="top">
    <div class="logo">
        <i class='bx bx-barcode'></i>
        <span>Visit Admin App</span>
    </div>
    <i class="bx bx-menu" id="btn"></i>
</div>
<div class="user">
    <img src="img/img.png" alt="eu" class="user-img">
    <div>
        <p class="bold">Andrei O.</p>
        <p>Admin</p>
    </div>
</div>
<ul>
    <li>
        <a href="./register_visit.html">
            <i class='bx bxs-pencil' style='color:#86c2f2'></i>
            <span class="nav-item">Plan a visit</span>
        </a>
        <span class="tooltip">Plan a visit</span>
    </li>
    <li>
        <a href="./admin_visit_list.html">
            <i class='bx bx-list-ul' style='color:#86c2f2'></i>
            <span class="nav-item">Visits list</span>
        </a>
        <span class="tooltip">Visits list</span>
    </li>
    <li>
        <a href="./register_new_inmate.html">
            <i class='bx bx-show-alt' style="color: #86c2f2;"></i>
            <span class="nav-item">Register New Inmate</span>
        </a>
        <span class="tooltip">Register New Inmate</span>
    </li>
    <li>
        <a href="./admin_inmate_list.html">
            <i class='bx bx-show-alt' style="color: #86c2f2;"></i>
            <span class="nav-item">Prisoners</span>
        </a>
        <span class="tooltip">Prisoners</span>
    </li>
    <li>
        <a href="./admin_login.html">
            <i class='bx bx-log-in' style='color:#86c2f2'></i>
            <span class="nav-item">LogIn</span>
        </a>
        <span class="tooltip">LogIn</span>
    </li>
    <li>
        <a href="./admin_register.html">
            <i class="bx bxs-registered" style='color:#86c2f2' ></i>
            <span class="nav-item">Create admin account</span>
        </a>
        <span class="tooltip">Sign in</span>
    </li>
    <li>
        <a href="./index.html">
            <i class="bx bx-log-out" style='color:#86c2f2'></i>
            <span class="nav-item">Logout</span>
        </a>
        <span class="tooltip">Logout</span>
    </li>
</ul>`;
let btn = document.querySelector('#btn');

btn.onclick = function(){
    sidebar.classList.toggle('active');
    console.log("Button pressed");
};
}

document.addEventListener("readystatechange", main);