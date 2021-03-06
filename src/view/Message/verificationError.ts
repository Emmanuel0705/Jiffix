const template = `
    <html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'),
                        url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                            format('woff');
                }

                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'),
                        url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                            format('woff');
                }

                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'),
                        url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                            format('woff');
                }

                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
                        url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                            format('woff');
                }
            }

            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            /* MOBILE STYLES */
            @media screen and (max-width: 600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }

            /* ANDROID CENTER FIX */
            div[style*='margin: 16px 0;'] {
                margin: 0 !important;
            }
        </style>
    </head>

    <body
        style="
            background-color: #f4f4f4;

            margin: 0 !important;
            padding: 0 !important;
        "
    >
        <!-- HIDDEN PREHEADER TEXT -->
        <div
            style="
                display: none;
                font-size: 1px;
                color: #fefefe;
                line-height: 1px;
                font-family: 'Lato', Helvetica, Arial, sans-serif;
                max-height: 0px;
                max-width: 0px;
                opacity: 0;
                overflow: hidden;
            "
        >
            We're thrilled to have you here! Get ready to dive into your new
            account.
        </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#17b7ea" align="center">
                    <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px;"
                    >
                        <tr>
                            <td
                                align="center"
                                valign="top"
                                style="padding: 40px 10px 40px 10px;"
                            ></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td
                    bgcolor="#17b7ea"
                    align="center"
                    style="padding: 0px 10px 0px 10px;"
                >
                    <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px;"
                    >
                        <tr>
                            <td
                                bgcolor="#ffffff"
                                align="center"
                                valign="top"
                                style="
                                    padding: 40px 20px 20px 20px;
                                    border-radius: 4px 4px 0px 0px;
                                    color: #111111;
                                    font-family: 'Lato', Helvetica, Arial,
                                        sans-serif;
                                    font-size: 48px;
                                    font-weight: 400;
                                    letter-spacing: 4px;
                                    line-height: 48px;
                                "
                            >
                                <h1
                                    style="
                                        font-size: 48px;
                                        font-weight: 400;
                                        margin: 2;
                                    "
                                >
                                    Error
                                </h1>
                                <img
                                    src="data:image/png;base64,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"
                                    width="125"
                                    height="120"
                                    style="display: block; border: 0px;"
                                />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td
                    bgcolor="#f4f4f4"
                    align="center"
                    style="padding: 0px 10px 0px 10px;"
                >
                    <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px;"
                    >
                        <tr>
                            <td
                                bgcolor="#ffffff"
                                align="left"
                                style="
                                    padding: 20px 30px 40px 30px;
                                    color: #666666;
                                    font-family: 'Lato', Helvetica, Arial,
                                        sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                    line-height: 25px;
                                "
                            >
                                <p style="margin: 0;">
                                    Your request to verify your email has
                                    expired or the link has already been used
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
    `;

export default template;
