import moment from 'moment';

export default function coverGenerator(titulo, projetoSelecionado, name) {
    const data = moment().format('L');

    const { razaosocial, nome } = projetoSelecionado;

    let html = "<div style='width: 210mm !important; min-height: 297mm; margin-left: auto; margin-right: auto; padding: 45px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;'>" +
                    "<h1>" + nome + "</h1>" +
                    "<span>" + titulo + "</span>" +
                    "<div style='left: 15px; position: fixed; display: flex; justify-content: center; align-items: flex-start; flex-direction: column; bottom: 80px; position: absolute'>"+
                        "<div><b>Cliente:</b>&nbsp<span>" + razaosocial + "</span></div>"+
                        "<div><b>Responsável:</b>&nbsp<span>" + name + "</span></div>"+
                        "<div><b>Data de Emissão:</b>&nbsp<span>" + data + "</span></div>"+
                    "</div>"+
                "</div>";

    return html;
}