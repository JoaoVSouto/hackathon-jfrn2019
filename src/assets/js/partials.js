const sentMessage = content => `
    <div class="d-flex justify-content-end mb-4">
      <div class="msg_cotainer_send">
        ${content}
      </div>
      <div class="img_cont_msg">
        <img
          src="https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"
          class="rounded-circle user_img_msg"
        />
      </div>
    </div>
  `;

const receivedMessageNU = content => `
    <div class="d-flex justify-content-start mb-4">
      <div class="img_cont_msg">
        <img src="https://enem.inep.gov.br/participante/static/media/normal.ef09b19d.png"
          class="rounded-circle user_img_msg" />
      </div>
      <div class="msg-button-text">
        <div class="msg_cotainer">
          ${content}
        </div>
      </div>
    </div>
  `;

const receivedMessage = content => `
    <div class="d-flex justify-content-start mb-4">
      <div class="img_cont_msg">
        <img src="https://enem.inep.gov.br/participante/static/media/normal.ef09b19d.png"
          class="rounded-circle user_img_msg" />
      </div>
      <div class="msg-button-text">
        <div class="msg_cotainer">
          ${content}
        </div>
        <button class="btn btn-success" id="formasDeAcesso">Formas de acesso</button>
        <button class="btn btn-success" id="requisitos">Requisitos para acesso</button>
        <button class="btn btn-success" id="etapas">Etapas do serviço</button>
        <button class="btn btn-success" id="formasDePrestacao">Como o serviço é prestado?</button>
        <button class="btn btn-success" id="prioridadeDeAtendimento">Prioridade de atendimento</button>
      </div>
    </div>
  `;

const receivedMessageManyOptions = (content, options) => `
    <div class="d-flex justify-content-start mb-4">
      <div class="img_cont_msg">
        <img src="https://enem.inep.gov.br/participante/static/media/normal.ef09b19d.png"
          class="rounded-circle user_img_msg" />
      </div>
      <div class="msg-button-text">
        <div class="msg_cotainer">
          ${content}
        </div>
        ${options
          .map(
            option =>
              `<button class="btn btn-primary" id="${option}">${option}</button>`
          )
          .join(' ')}
      </div>
    </div>
  `;
