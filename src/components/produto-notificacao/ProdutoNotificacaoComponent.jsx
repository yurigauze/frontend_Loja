import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Toast } from 'primereact/toast';

const ProdutoNotificacao = () => {
    const [ultimaNotificacao, setUltimaNotificacao] = useState(null);
    const [clienteStomp, setClienteStomp] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            setClienteStomp(stomp);
            stomp.subscribe('/produto/novo-produto', (message) => {
                const notificationData = JSON.parse(message.body);
                setUltimaNotificacao(notificationData);
                showToast(notificationData.descricao);
            });
        });
    }, []);

    const showToast = (descricao) => {
        toast.current.show({
            severity: 'info',
            summary: 'Novo Produto',
            detail: descricao,
            life: 5000,
        });
    };

    return (
        <>
            <Toast ref={toast} />
        </>
    );
}

export default ProdutoNotificacao;
