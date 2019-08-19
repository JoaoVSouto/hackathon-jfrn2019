const setEventToButtonsPri = () => {
  const buttons = document.querySelectorAll('button.btn.btn-primary');
  buttons.forEach(button => {
    button.onclick = e => handleButtonQuestionPri(e.target.textContent);
  });
};

const setEventToButtonsSuc = responseId => {
  const buttons = document.querySelectorAll('button.btn.btn-success');
  buttons.forEach(button => {
    button.onclick = e => handleButtonQuestionSuc(e, responseId);
  });
};

const scrollToBottom = () => container.scroll(0, container.scrollHeight - 500);

const genResponse = async (question, flag) => {
  let response = {};
  response.subjects = [];
  response.subjectsName = [];

  const words = question.split(' ');

  for (word of words) {
    const resp = await fetch(
      `https://servicos.jfrn.jus.br/cartaapi/servicos/busca/${word}`
    );
    const json = await resp.json();
    json && response.subjects.push(...json);
  }

  if (flag) {
    response.responseText = `O que você deseja pesquisar sobre <strong>${
      response.subjects[0].nome
    }</strong>?`;
    response.responseId = response.subjects[0].id;
    return {
      responseText: response.responseText,
      responseId: response.responseId,
      subjectNames: response.subjectsName
    };
  }

  if (response.subjects.length === 1) {
    response.responseText = `O que você deseja pesquisar sobre <strong>${
      response.subjects[0].nome
    }</strong>?`;
    response.responseId = response.subjects[0].id;
  } else if (response.subjects.length > 1) {
    response.responseText =
      'Quais dessas opções melhor se encaixa com sua necessidade?';
    response.responseId = true;
    response.subjectsName = response.subjects.map(subject => subject.nome);
  } else {
    response.responseText =
      'Não entendi o que disse. Tente com outras palavras.';
  }

  return {
    responseText: response.responseText,
    responseId: response.responseId,
    subjectNames: response.subjectsName
  };
};

const handleButtonQuestionSuc = async (e, responseId) => {
  const resp = await fetch(
    `https://servicos.jfrn.jus.br/cartaapi/servicos/${responseId}`
  );
  const json = await resp.json();

  container.innerHTML += receivedMessage(json.procedimento[e.target.id]);
  setEventToButtonsSuc(responseId);
  scrollToBottom();
};

const handleButtonQuestionPri = text => {
  input.value = text;
  submitForm(true);
};

const submitForm = isExternal => {
  const content = input.value;
  input.value = '';

  container.innerHTML += sentMessage(content);
  scrollToBottom();
  // espera um tempinho só pra ficar massa
  setTimeout(async () => {
    const res = await genResponse(content, isExternal);
    if (res.responseId && res.subjectNames.length > 0) {
      container.innerHTML += receivedMessageManyOptions(
        res.responseText,
        res.subjectNames
      );
      setEventToButtonsPri();
    } else if (res.responseId) {
      container.innerHTML += receivedMessage(res.responseText);
      setEventToButtonsSuc(res.responseId);
    } else {
      container.innerHTML += receivedMessageNU(res.responseText);
    }
    scrollToBottom();
  }, 300);
};
