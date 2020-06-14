// components/NotFound.js
import React from 'react';
import './styles.css';

const NotFound = () =>
    <div class="container">
        <div class="row">
            <div class="xs-12 md-6 mx-auto">
                <div id="countUp">
                    <div class="number">404</div>
                    <div class="text">Página não encontrada.</div>
                    <a class="button-back" href="/home">Voltar</a>
                </div>
            </div>
        </div>
    </div>

export default NotFound;