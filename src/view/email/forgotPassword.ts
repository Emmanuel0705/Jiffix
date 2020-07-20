export const template = (url: string): string => {
    return `
    <html>
    <head>
        <meta charset="utf-8" />
        <style>
            .container {
                padding: 10px;
                width: 90%;
                margin: auto;
                box-shadow: 1px 2px 9px #ccc;
                text-align: center;
                border:2px solid DodgerBlue;
            }

            .btn {
                border: none;
                padding: 10px;
                font-size: 18px;
                background-color: DodgerBlue;
                color: white;
                border-radius: 10px;
            }
            img {
                width: 200px;
                height: 100px;
            }
            
        </style>
    </head>
    <body>
        <div class="container text-center">
            <div class="top-div">
                <img
                    class="img"
                    src="https://pbs.twimg.com/profile_images/1181821679414239232/Lv4JAjaK_400x400.jpg"
                />
                             
            </div>
            <hr />

            Kindly click the button below to reset your password <br />
            <a class="a" href="${url}"
                ><button class="btn btn-success">Proceed</button>
            </a>
            <br />
            <br />
            <br />
            <b>NOTE:</b>
            If you didn’t forget your jiffix account password, you can ignore this
            email.
        </div>
    </body>
</html>
     `;
};

export const text = (url: string): string => {
    return `
   
    Kindly click the button below to reset your password \n ${url}
    \n
    NOTE: If you didn’t forget your jiffix account password, you can ignore this
    email.
    `;
};
