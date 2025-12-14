<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Menu FiveM</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #1c1c1c;
            color: white;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 100vh;
        }

        #menu-container {
            width: 400px;
            background-color: #111;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 50px;
            box-shadow: 0 0 15px #000;
            display: none; /* menu caché par défaut */
        }

        /* Header image */
        #menu-header {
            width: 100%;
            height: 120px;
            background: url('https://i.ibb.co/p6fVFD1v/standard-4.png') center/cover no-repeat;
        }

        /* Liste verticale des onglets et options */
        #menu-tabs, #menu-options {
            display: flex;
            flex-direction: column;
        }

        #menu-tabs div, #menu-options div {
            padding: 10px;
            border-bottom: 1px solid #222;
        }

        #menu-tabs .active {
            background-color: #222;
        }

        /* Sous-page options fond noir, texte blanc */
        .subpage {
            background-color: #111;
            color: white;
            padding: 10px;
        }

        .subpage div {
            margin: 5px 0;
            cursor: pointer;
        }

        .active-option {
            background-color: #444;
        }

    </style>
</head>
<body>

<div id="menu-container">
    <div id="menu-header"></div>

    <!-- Page principale -->
    <div id="menu-tabs">
        <div class="tab active">Player</div>
        <div class="tab">Visual</div>
        <div class="tab">Combat</div>
        <div class="tab">Weapons</div>
        <div class="tab">Online</div>
        <div class="tab">Settings</div>
    </div>

    <!-- Page options -->
    <div id="menu-options"></div>
</div>

<script>
    const tabs = document.querySelectorAll('.tab');
    const menuTabs = document.getElementById('menu-tabs');
    const menuOptions = document.getElementById('menu-options');
    const menuContainer = document.getElementById('menu-container');

    let currentTab = 0;
    let currentOption = 0;
    let inOptionsPage = false;
    let menuVisible = false;

    const tabOptions = {
        Player: ['Spawn une voiture', 'Se soigner', 'Changer skin'],
        Visual: ['Night Mode', 'ESP', 'Chams'],
        Combat: ['Aimbot', 'Triggerbot', 'Auto Shoot'],
        Weapons: ['Give Pistol', 'Give Rifle', 'Give Knife'],
        Online: ['Teleport', 'Kick Player', 'Ban Player'],
        Settings: ['Changer couleur', 'Toggle Sound', 'Reset Menu']
    };

    function updateActiveTab() {
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === currentTab);
        });
    }

    function showOptionsPage(tabName) {
        menuTabs.style.display = 'none';
        menuOptions.innerHTML = '';
        menuOptions.style.display = 'flex';
        menuOptions.style.flexDirection = 'column';

        const subpage = document.createElement('div');
        subpage.classList.add('subpage');

        tabOptions[tabName].forEach((opt, index) => {
            const div = document.createElement('div');
            div.textContent = opt;
            if(index === 0) div.classList.add('active-option');
            subpage.appendChild(div);
        });

        menuOptions.appendChild(subpage);
        currentOption = 0;
        inOptionsPage = true;
    }

    function backToMainMenu() {
        menuTabs.style.display = 'flex';
        menuOptions.style.display = 'none';
        inOptionsPage = false;
        currentOption = 0;
    }

    function navigateOptions(direction) {
        const options = document.querySelectorAll('.subpage div');
        if(!options.length) return;

        options[currentOption].classList.remove('active-option');

        if (direction === 'down') {
            currentOption = (currentOption + 1) % options.length;
        } else if (direction === 'up') {
            currentOption = (currentOption - 1 + options.length) % options.length;
        }

        options[currentOption].classList.add('active-option');
    }

    document.addEventListener('keydown', (e) => {
        // Ouvrir/Fermer menu avec F2
        if(e.key === 'F2') {
            e.preventDefault(); // évite un comportement par défaut
            menuVisible = !menuVisible;
            menuContainer.style.display = menuVisible ? 'block' : 'none';
            if(menuVisible) updateActiveTab();
            inOptionsPage = false;
            return;
        }

        if(!menuVisible) return;

        if(!inOptionsPage) {
            if(e.key === 'ArrowDown') {
                currentTab = (currentTab + 1) % tabs.length;
                updateActiveTab();
            } else if(e.key === 'ArrowUp') {
                currentTab = (currentTab - 1 + tabs.length) % tabs.length;
                updateActiveTab();
            } else if(e.key === 'Enter') {
                showOptionsPage(tabs[currentTab].textContent);
            }
        } else {
            if(e.key === 'ArrowDown') {
                navigateOptions('down');
            } else if(e.key === 'ArrowUp') {
                navigateOptions('up');
            } else if(e.key === 'Enter') {
                alert(`Option choisie : ${document.querySelectorAll('.subpage div')[currentOption].textContent}`);
            } else if(e.key === 'Delete') {
                backToMainMenu();
            }
        }
    });

    // Initialisation
    menuOptions.style.display = 'none';
</script>

</body>
</html>  
