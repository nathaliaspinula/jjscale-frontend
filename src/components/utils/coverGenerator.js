export default function coverGenerator() {
    const user = JSON.parse(localStorage.getItem('user'));

    let html = "<div style='width: 210mm !important; min-height: 297mm; margin-left: auto; margin-right: auto; padding: 45px; display: flex; flex-direction: column; justify-content: center; align-items: center;'>" +
                    "<h1>PROJETO SME</h1>" +
                    "<span>PROJETO SME</span>" +
                    "<div style='position: relative; display: flex; justify-content: center; align-items: flex-start; flex-direction: column; top: 475px; right: 335px;'>"+
                        "<b>ID:</b> abcd" +
                        "<b>Cliente:</b>" +
                        "<b>Responsável:</b>" +
                        "<b>Data de Emissão</b>" + 
                    "</div>"+
                "</div>" + 
                "<div id='conteudo'></div>";

    return html;
}