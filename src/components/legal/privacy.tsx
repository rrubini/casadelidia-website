import { CONTACT_EMAIL } from "@/lib/site";
import { LegalHeader, Summary } from "./legal-layout";

export function PrivacyContent() {
  return (
    <article className="legal-prose">
      <LegalHeader title="Política de Privacidade" updated="29 de setembro de 2026" version="2.0" />

      <Summary>
        <li>Coletamos só o necessário para criar sua conta, gerar roteiros e cobrar o plano.</li>
        <li>Não vendemos seus dados nem os usamos para publicidade.</li>
        <li>
          O conteúdo do culto é processado por IA (Google Gemini, por padrão) para gerar o roteiro.
        </li>
        <li>Os pagamentos com cartão ficam com a Asaas; não guardamos os dados do seu cartão.</li>
        <li>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento.</li>
      </Summary>

      <p>
        Esta Política explica como o Casa de Lídia (“nós”) coleta, usa, guarda e protege os seus
        dados pessoais no site casadelidia.com.br e no app app.casadelidia.com.br, de acordo com a
        Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018). O Casa de Lídia é o controlador dos
        dados tratados no serviço.
      </p>

      <h3>1. Dados que coletamos</h3>
      <h4>1.1 Cadastro</h4>
      <ul>
        <li>Nome e e-mail.</li>
        <li>Nome da igreja e canal do YouTube, se você informar.</li>
        <li>
          Se você entrar com o Google, recebemos da sua conta Google o nome, o e-mail e a foto de
          perfil.
        </li>
        <li>
          Se você criar a conta com e-mail e senha, a senha é guardada de forma criptografada
          (hash), nunca em texto puro.
        </li>
      </ul>
      <h4>1.2 Conteúdo que você envia e gera</h4>
      <ul>
        <li>links de vídeos do YouTube e as marcações de início e fim da pregação;</li>
        <li>transcrições dos vídeos e esboços de sermão enviados;</li>
        <li>modelos de roteiro, inclusive os criados a partir de um PDF ou de um prompt seu;</li>
        <li>os roteiros gerados e editados.</li>
      </ul>
      <p>
        A transcrição de um culto público fica guardada e pode ser reaproveitada quando outra conta
        usar o mesmo vídeo, sem precisar transcrevê-lo de novo.
      </p>
      <h4>1.3 Uso e dispositivo</h4>
      <ul>
        <li>data e hora de acesso, endereço IP, navegador e dispositivo;</li>
        <li>histórico de roteiros gerados, usado para controlar o limite do teste e do plano.</li>
      </ul>
      <h4>1.4 Pagamento</h4>
      <p>
        Os pagamentos com cartão de crédito são processados pela Asaas, que recebe os dados do
        cartão e pode pedir dados de cobrança como nome, e-mail e CPF ou CNPJ. Nós não guardamos o
        número nem o código de segurança do seu cartão: ficamos apenas com os identificadores da
        cobrança, o status da assinatura e o histórico de pagamentos.
      </p>

      <h3>2. Para que usamos os dados</h3>
      <ul>
        <li>
          <strong>Criar e manter sua conta e fazer o login</strong>: execução de contrato (LGPD,
          art. 7º, V).
        </li>
        <li>
          <strong>Gerar os roteiros</strong>, o que inclui transcrever e analisar o conteúdo
          enviado: execução de contrato.
        </li>
        <li>
          <strong>Acompanhar o canal do YouTube informado</strong> e avisar por e-mail quando um
          culto novo puder virar roteiro: execução de contrato.
        </li>
        <li>
          <strong>Cobrar o plano e emitir notas fiscais</strong>: execução de contrato e cumprimento
          de obrigação legal (art. 7º, II).
        </li>
        <li>
          <strong>Enviar e-mails do serviço</strong>, como a verificação do e-mail e avisos sobre a
          conta: execução de contrato.
        </li>
        <li>
          <strong>Segurança e prevenção de fraudes</strong>, incluindo os registros de acesso:
          cumprimento de obrigação legal e legítimo interesse (art. 7º, IX).
        </li>
        <li>
          <strong>Suporte e melhoria do produto</strong>: execução de contrato e legítimo interesse.
        </li>
        <li>
          <strong>Novidades e ofertas por e-mail</strong>: somente com o seu consentimento (art. 7º,
          I), que pode ser retirado a qualquer momento.
        </li>
      </ul>

      <h3>3. Com quem compartilhamos</h3>
      <p>
        Não vendemos seus dados nem os compartilhamos para publicidade. Compartilhamos apenas com os
        fornecedores que fazem o serviço funcionar, e só na medida do necessário:
      </p>
      <ul>
        <li>
          <strong>Google Cloud</strong>: hospedagem do app e do banco de dados.
        </li>
        <li>
          <strong>Provedores de IA</strong>: o Google (Gemini) é usado por padrão, e a OpenAI e a
          Anthropic podem ser usadas como alternativa. Eles recebem o conteúdo necessário para a
          tarefa, como o vídeo público do culto, a transcrição, o esboço e o modelo do roteiro.
        </li>
        <li>
          <strong>YouTube</strong>: usamos os Serviços de API do YouTube para acompanhar o canal
          informado e ler vídeos e legendas públicos. O uso desses serviços segue a{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Política de Privacidade do Google
          </a>
          .
        </li>
        <li>
          <strong>Asaas</strong>: processamento dos pagamentos.
        </li>
        <li>
          <strong>Resend</strong>: envio dos e-mails do serviço.
        </li>
        <li>
          <strong>Google (login)</strong>: apenas se você escolher entrar com a sua conta Google.
        </li>
        <li>
          <strong>Autoridades</strong>: quando exigido por lei ou por ordem judicial.
        </li>
      </ul>

      <h3>4. Transferência internacional</h3>
      <p>
        O app e o banco de dados ficam em servidores do Google Cloud nos Estados Unidos, e os
        provedores de IA e a Resend também processam dados fora do Brasil. Nesses casos, usamos
        fornecedores que oferecem garantias de proteção de dados compatíveis com a LGPD (art. 33).
      </p>

      <h3>5. Por quanto tempo guardamos</h3>
      <ul>
        <li>
          <strong>Conta e conteúdo</strong>: enquanto a conta estiver ativa. Quando você exclui a
          conta, apagamos seus dados, exceto os que a lei nos obriga a manter.
        </li>
        <li>
          <strong>Registros de pagamento</strong>: 5 anos, conforme a legislação fiscal.
        </li>
        <li>
          <strong>Registros de acesso</strong>: 6 meses, conforme o Marco Civil da Internet (art.
          15).
        </li>
        <li>
          <strong>Consentimento para e-mails de novidades</strong>: até você retirá-lo.
        </li>
      </ul>

      <h3>6. Seus direitos</h3>
      <p>Pela LGPD (art. 18), você pode, a qualquer momento:</p>
      <ul>
        <li>confirmar se tratamos seus dados e ter acesso a eles;</li>
        <li>corrigir dados incompletos, errados ou desatualizados;</li>
        <li>pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários;</li>
        <li>pedir a portabilidade dos seus dados;</li>
        <li>pedir a exclusão da sua conta e dos seus dados;</li>
        <li>saber com quem compartilhamos seus dados;</li>
        <li>retirar o consentimento dado para e-mails de novidades.</li>
      </ul>
      <p>
        Para exercer esses direitos, escreva para{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Respondemos em até 15 dias.
      </p>

      <h3>7. Segurança</h3>
      <p>
        Usamos conexões criptografadas (HTTPS), guardamos senhas com hash, fazemos cópias de
        segurança diárias do banco de dados e restringimos o acesso aos dados a quem precisa deles
        para operar o serviço. Nenhum sistema é totalmente invulnerável: se houver um incidente de
        segurança que possa trazer risco a você, comunicaremos você e a ANPD, como prevê a LGPD
        (art. 48).
      </p>

      <h3>8. Cookies</h3>
      <p>
        O site casadelidia.com.br não usa cookies. O app usa apenas cookies essenciais, para manter
        você conectado e proteger a sua sessão. Não usamos cookies de publicidade nem de
        rastreamento de terceiros.
      </p>

      <h3>9. Menores de idade</h3>
      <p>
        O Casa de Lídia é destinado a maiores de 18 anos. Não coletamos intencionalmente dados de
        menores de idade.
      </p>

      <h3>10. Alterações nesta Política</h3>
      <p>
        Podemos atualizar esta Política. Mudanças importantes serão avisadas por e-mail ou no app, e
        a data da versão em vigor fica sempre no topo deste documento.
      </p>

      <h3>11. Contato</h3>
      <p>
        Dúvidas, pedidos e reclamações sobre os seus dados pessoais:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p>
        Se entender que o tratamento dos seus dados não está de acordo com a lei, você também pode
        reclamar à Autoridade Nacional de Proteção de Dados (ANPD), em{" "}
        <a href="https://www.gov.br/anpd" target="_blank" rel="noreferrer">
          gov.br/anpd
        </a>
        .
      </p>
    </article>
  );
}
