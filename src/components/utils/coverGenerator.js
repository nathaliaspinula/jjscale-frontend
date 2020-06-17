export default function coverGenerator(titulo, projetoSelecionado) {
    const user = JSON.parse(localStorage.getItem('user'));
    const { razaosocial } = projetoSelecionado;
    let html = "<div style='width: 210mm !important; min-height: 297mm; margin-left: auto; margin-right: auto; padding: 45px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;'>" +
                    "<h1>PROJETO SME</h1>" +
                    "<span>"+titulo+"</span>" +
                    "<div style='left: 15px; position: fixed; display: flex; justify-content: center; align-items: flex-start; flex-direction: column; bottom: 80px; position: absolute'>"+
                        "<b>ID:</b>" +
                        "<div><b>Cliente:</b>&nbsp<span>"+razaosocial+"</span></div>"+
                        "<div><b>Responsável:</b>&nbsp<span>"+user.name+"</span></div>"+
                        "<b>Data de Emissão</b>" + 
                    "</div>"+
                "</div>";

    return html;
}