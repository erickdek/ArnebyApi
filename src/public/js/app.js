// Obtener el dominio/subdominio automáticamente
const domain = window.location.origin;

//Page Login
if (window.location.href.includes('/login')) {
    const formlogin = document.getElementById("form-login");
    if (formlogin) {
        formlogin.addEventListener("submit", e => {
            e.preventDefault(); // Detener la acción por defecto del formulario
            const appnotice = document.getElementById("app_notice");
            const data = Object.fromEntries(
                new FormData(e.target)
            )
        
            // Realizar la solicitud POST a la API
            fetch(`${domain}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                appnotice.classList.add('visible');
                appnotice.textContent = data.msg;
                if (data.data.token) {
                    // Inicio de sesión exitoso, refresca la página
                    window.location.href = `${domain}/panel`
                } else {
                    // Mostrar un mensaje de error
                    appnotice.textContent = data.msg;
                }
            })
            .catch(error => {

                console.error("Error en la solicitud:", error);
                // Mostrar un mensaje de error genérico
                appnotice.textContent = "Ha ocurrido un error en la solicitud.";
            });

            //Resetear Valores
            formlogin.reset();
        });
    }
}

//Page Panel
if (window.location.href.includes('/panel')) {
    const txt_data1 = document.getElementById("ip-data1");
    const txt_data2 = document.getElementById("ip-data2");
    const txt_data3 = document.getElementById("ip-data3");
    const txt_data4 = document.getElementById("ip-data4");

    // Obtén una referencia al elemento contenedor donde se mostrarán las aplicaciones
    const panelAppsContainer = document.querySelector('.panel-apps');

    //Get Title
    const txt_title = document.getElementById("panel-title");

    if(txt_data1 && txt_data2 && txt_data3 && txt_data4) {
        // La URL actual contiene '/panel', por lo que estamos en la página de panel
        fetch(`${domain}/api/v1/auth`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            txt_data1.textContent = data.data.user.credits? data.data.user.credits : 0;
            txt_data2.textContent = data.data.user.apps ? data.data.user.apps : 0;
            txt_data3.textContent = data.data.user.posts ? data.data.user.posts : 0;
            txt_data4.textContent = "US$ " + (data.data.user.balance ? data.data.user.balance : 0);
            txt_title.textContent = "Hola, " + data.data.user.username;

            // Supongamos que data.apps es un arreglo de objetos con los datos de las aplicaciones
            data.data.apps.forEach(app => {
                // Crea un nuevo elemento <a> para cada aplicación
                const appElement = document.createElement('a');
                appElement.classList.add('item-app');
                appElement.href = `panel/app?appid=${app.appid}`; // Asegúrate de utilizar el campo de ID correcto

                // Crea un elemento <h3> para el nombre de la aplicación
                const appNameElement = document.createElement('h3');
                appNameElement.textContent = app.name;

                // Crea un elemento <p> para el tipo de aplicación (apptype)
                const appTypeElement = document.createElement('p');
                appTypeElement.textContent = app.apptype;

                // Agrega los elementos al contenedor
                appElement.appendChild(appNameElement);
                appElement.appendChild(appTypeElement);
                panelAppsContainer.appendChild(appElement);
            });

        })
        .catch(error => {
            console.error("Error en la solicitud a la API:", error);
        });
    }
}

//Page Panel - Add App
if (window.location.href.includes('/panel/add')) {
    // Obtén el elemento <textarea> y el elemento para mostrar el recuento de caracteres
    const formPost = document.getElementById('form-app-create');
    const textarea = document.getElementById('resume');
    const charCount = document.getElementById('char-count');

    if (formPost) {
        const appnotice = document.getElementById("app_notice");
        formPost.addEventListener('submit', e => {
            e.preventDefault();
            const dataform = Object.fromEntries(new FormData(e.target));

            // Realizar la solicitud POST a la API
            fetch(`${domain}/api/v1/app`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataform)
            })
            .then(response => response.json())
            .then(data => {
                appnotice.classList.add('visible');
                appnotice.textContent = data.msg;
                if (data.success) {
                    // Inicio de sesión exitoso, refresca la página
                    window.location.href = `${domain}/panel`;
                } else {
                    // Mostrar un mensaje de error
                    appnotice.textContent = data.msg;
                }
            })
            .catch(error => {
                appnotice.classList.add('visible');
                console.error("Error en la solicitud:", error);
                // Mostrar un mensaje de error genérico
                appnotice.textContent = "Ha ocurrido un error en la solicitud.";
            });

            //Resetear Formulario
            formPost.reset();
        })
    }

    // Define la cantidad máxima de caracteres permitidos
    const maxLength = 250;

    // Escucha el evento 'input' en el <textarea>
    textarea.addEventListener('input', function () {
        const currentLength = textarea.value.length;

        // Actualiza el recuento de caracteres
        charCount.textContent = currentLength + '/' + maxLength;

        // Si se supera el límite de caracteres, recorta el contenido del <textarea>
        if (currentLength > maxLength) {
            textarea.value = textarea.value.slice(0, maxLength);
            charCount.textContent = maxLength + '/' + maxLength;
        }
    });
}

//Page App
if (window.location.href.includes('/panel/app')){
    const url = new URL(window.location.href);
    // Obtiene el valor del parámetro 'appid' de la URL
    const appid = url.searchParams.get("appid");
    console.log('App: ' + appid);

    
}