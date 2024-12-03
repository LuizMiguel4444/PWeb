import React from 'react';
import { FaInstagram } from 'react-icons/fa';

function View() {
    return (
        <div>
            <h1 className="text-lg font-bold">Veja mais</h1>
            <ul>
                <li><a 
                    href="https://www.instagram.com/festadesantanacaicooficial/?hl=pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-zinc-400 hover:text-white transition-colors mt-2"
                >
                    <FaInstagram className="text-2xl mr-2" />
                </a></li>
            </ul>
        </div>
    )
}

export default View;