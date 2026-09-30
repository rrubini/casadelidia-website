import { CONTACT_EMAIL } from "@/lib/site";
import { LegalHeader, Summary } from "./legal-layout";

export function TermsContent() {
  return (
    <article className="legal-prose">
      <LegalHeader title="Termos de Uso" updated="29 de setembro de 2026" version="2.1" />

      <Summary>
        <li>Teste grátis de 30 dias com até 5 roteiros, sem cartão.</li>
        <li>Um plano com até 30 roteiros por mês.</li>
        <li>Pagamento por cartão de crédito, processado pela Asaas, com renovação automática.</li>
        <li>
          Você cancela quando quiser, pelo app. Em até 7 dias depois de assinar, pode desistir e
          receber tudo de volta.
        </li>
        <li>
          No Anual, se cancelar depois dos 7 dias, cobramos cada mês já iniciado pelo preço do
          Mensal e devolvemos o restante.
        </li>
        <li>O roteiro é gerado por IA: revise antes de compartilhar.</li>
      </Summary>

      <p>
        Estes Termos de Uso regulam o uso do Casa de Lídia, disponível em casadelidia.com.br e
        app.casadelidia.com.br. Ao criar uma conta ou usar o serviço, você concorda com estes Termos
        e com a nossa <a href="#privacidade">Política de Privacidade</a>. Se não concordar, não use
        o serviço.
      </p>

      <h3>1. O que é o Casa de Lídia</h3>
      <p>
        O Casa de Lídia é um serviço on-line que usa inteligência artificial para transformar a
        pregação do culto em um roteiro para a reunião de célula (pequenos grupos). Com ele, você
        pode:
      </p>
      <ul>
        <li>colar o link de um culto no YouTube e marcar onde a pregação começa e termina;</li>
        <li>enviar o esboço do sermão, quando não houver vídeo;</li>
        <li>
          informar o canal do YouTube da igreja e receber um aviso por e-mail quando um culto novo
          já puder virar roteiro. Esse acompanhamento só identifica o culto e avisa: nenhum roteiro
          é gerado sem você pedir;
        </li>
        <li>
          criar modelos de roteiro com as seções que a sua igreja usa, inclusive a partir de um PDF
          ou de um prompt que você já tenha;
        </li>
        <li>revisar, editar e pedir para refazer só uma parte do roteiro;</li>
        <li>exportar o roteiro em Word ou PDF, ou copiá-lo formatado para o WhatsApp.</li>
      </ul>
      <p>
        Quando o vídeo não tem legenda, a pregação é transcrita automaticamente por IA. O vídeo
        precisa ser público no YouTube; para vídeos não listados ou privados, use o esboço.
      </p>

      <h3>2. Sua conta</h3>
      <ul>
        <li>Você precisa ter 18 anos ou mais para usar o serviço.</li>
        <li>
          A conta pode ser criada com o Google ou com e-mail e senha. As informações do cadastro
          devem ser verdadeiras e atualizadas.
        </li>
        <li>
          A conta é pessoal. Você é responsável por manter sua senha em sigilo e pelas atividades
          feitas com o seu acesso.
        </li>
        <li>
          Se suspeitar de uso indevido, avise-nos em{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </li>
      </ul>

      <h3>3. Teste grátis</h3>
      <ul>
        <li>Novas contas têm 30 dias de teste grátis, com até 5 roteiros.</li>
        <li>Não é preciso cadastrar cartão para começar.</li>
        <li>
          Durante o teste, os roteiros exportados levam a marca “Gerado com Casa de Lídia” no
          rodapé.
        </li>
        <li>
          Ao fim do teste, nada é cobrado automaticamente. Para continuar usando, você escolhe um
          plano.
        </li>
      </ul>

      <h3>4. Plano e pagamento</h3>
      <h4>4.1 Plano</h4>
      <p>
        O Casa de Lídia tem um plano com até 30 roteiros por mês. Pedir para refazer só uma parte de
        um roteiro não conta nesse limite. As opções de pagamento e os valores em vigor são
        mostrados no app antes da contratação.
      </p>
      <h4>4.2 Forma de pagamento</h4>
      <p>
        O pagamento é feito por cartão de crédito, dentro do app, e processado pela Asaas. O Casa de
        Lídia não armazena o número nem o código de segurança do seu cartão.
      </p>
      <h4>4.3 Renovação</h4>
      <p>
        A assinatura é renovada automaticamente no mesmo cartão ao fim de cada período, até você
        cancelar. Se a cobrança não for aprovada, você tem 3 dias para regularizar o pagamento;
        depois disso, o acesso aos recursos do plano é suspenso.
      </p>
      <h4>4.4 Ofertas promocionais</h4>
      <p>
        Ofertas promocionais podem ter regras próprias, como quantidade de vagas, informadas na
        divulgação de cada oferta. Quando um preço promocional vale enquanto a assinatura continuar
        ativa e em dia, cancelar a assinatura encerra a oferta: uma nova assinatura segue o preço em
        vigor.
      </p>
      <h4>4.5 Alteração de preço</h4>
      <p>
        Mudanças de preço são avisadas por e-mail com pelo menos 30 dias de antecedência e não
        afetam o período que você já pagou.
      </p>

      <h3>5. Cancelamento, desistência e reembolso</h3>
      <h4>5.1 Cancelamento</h4>
      <ul>
        <li>
          Você pode cancelar a qualquer momento no app, em <strong>Minha assinatura</strong> (no
          menu da sua conta ou em Configurações), ou escrevendo para{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </li>
        <li>
          O cancelamento interrompe as próximas cobranças, e você mantém o acesso até o fim do
          período já pago.
        </li>
      </ul>
      <h4>5.2 Desistência em até 7 dias</h4>
      <p>
        Em até 7 dias depois de assinar um plano, você pode desistir e receber de volta todo o valor
        pago, conforme o art. 49 do Código de Defesa do Consumidor. Isso vale para cada nova
        assinatura, inclusive quando você troca de plano ou volta a assinar; as renovações
        automáticas não abrem um novo prazo. A desistência pode ser feita no próprio app, em Minha
        assinatura, ou por e-mail. O acesso ao plano termina quando a desistência é feita, e você
        recebe a confirmação por e-mail. O valor volta no mesmo cartão, e o prazo para aparecer na
        fatura depende da operadora.
      </p>
      <h4>5.3 Depois dos 7 dias</h4>
      <ul>
        <li>
          <strong>Plano Mensal:</strong> não há reembolso do mês já pago. Você cancela e mantém o
          acesso até o fim dele.
        </li>
        <li>
          <strong>Plano Anual:</strong> o preço menor do Anual pressupõe o uso pelo ano inteiro. Se
          você cancelar depois dos 7 dias, peça o reembolso por e-mail em{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Cobramos cada mês já iniciado
          pelo preço do plano Mensal e devolvemos o restante do valor pago. O acesso continua até o
          fim do último mês cobrado, e a assinatura não é renovada. Se o valor dos meses usados
          chegar ao valor pago, não há devolução.
        </li>
      </ul>

      <h3>6. Uso aceitável</h3>
      <h4>Você pode</h4>
      <ul>
        <li>criar roteiros para uso próprio, da sua célula ou da sua igreja;</li>
        <li>compartilhar os roteiros com líderes e membros;</li>
        <li>editar e adaptar o conteúdo gerado como quiser.</li>
      </ul>
      <h4>Você não pode</h4>
      <ul>
        <li>revender ou repassar o acesso ao serviço sem autorização;</li>
        <li>compartilhar sua conta com outras pessoas;</li>
        <li>usar o serviço para fins ilegais;</li>
        <li>tentar burlar os limites do plano ou do teste grátis;</li>
        <li>usar robôs ou scripts para acessar o serviço ou sobrecarregar nossos servidores;</li>
        <li>copiar, modificar ou fazer engenharia reversa da plataforma.</li>
      </ul>

      <h3>7. Conteúdo que você envia e YouTube</h3>
      <ul>
        <li>
          Ao usar um vídeo do YouTube, um esboço ou um modelo em PDF, você declara que tem o direito
          de usar esse conteúdo, por exemplo, por ser da sua igreja ou por ter autorização.
        </li>
        <li>
          Você nos autoriza a processar esse conteúdo (transcrever, analisar e gerar o roteiro)
          apenas para prestar o serviço a você.
        </li>
        <li>
          O Casa de Lídia usa os Serviços de API do YouTube. Ao usar o serviço, você também concorda
          com os{" "}
          <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">
            Termos de Serviço do YouTube
          </a>
          .
        </li>
      </ul>

      <h3>8. Roteiros gerados por IA</h3>
      <ul>
        <li>
          O roteiro é gerado por inteligência artificial a partir do conteúdo enviado e pode conter
          imprecisões, inclusive em referências bíblicas. Revise tudo antes de compartilhar.
        </li>
        <li>
          Os roteiros gerados pertencem a você. Você pode usar, editar e distribuir como quiser.
        </li>
        <li>O conteúdo final que você compartilha é de sua responsabilidade.</li>
      </ul>

      <h3>9. Propriedade intelectual</h3>
      <p>
        A plataforma Casa de Lídia, incluindo código, design, marca e logotipo, pertence ao Casa de
        Lídia e é protegida pela legislação de direitos autorais e de propriedade industrial.
      </p>

      <h3>10. Disponibilidade e responsabilidade</h3>
      <p>
        Fazemos o possível para manter o serviço no ar e funcionando bem, mas não garantimos
        disponibilidade ininterrupta nem ausência de erros. O serviço depende de terceiros, como
        YouTube, Google, provedores de IA e Asaas, cujas falhas fogem ao nosso controle.
      </p>
      <p>
        Nos limites permitidos pela lei, o Casa de Lídia não responde por danos indiretos, lucros
        cessantes ou pelo uso que você fizer do conteúdo gerado.
      </p>

      <h3>11. Suspensão e encerramento</h3>
      <ul>
        <li>Você pode encerrar sua conta quando quiser.</li>
        <li>
          Podemos suspender ou encerrar contas em caso de violação destes Termos, fraude, falta de
          pagamento ou quando exigido por lei.
        </li>
        <li>
          Após o encerramento, seus dados são tratados conforme a nossa{" "}
          <a href="#privacidade">Política de Privacidade</a>.
        </li>
      </ul>

      <h3>12. Alterações nestes Termos</h3>
      <p>
        Podemos atualizar estes Termos. Mudanças importantes serão avisadas com pelo menos 30 dias
        de antecedência, por e-mail ou no app. Continuar usando o serviço depois disso significa que
        você aceita a nova versão.
      </p>

      <h3>13. Lei aplicável e foro</h3>
      <p>
        Estes Termos seguem as leis brasileiras, em especial o Código de Defesa do Consumidor, o
        Marco Civil da Internet (Lei 12.965/2014) e a LGPD (Lei 13.709/2018). Eventuais disputas
        serão resolvidas no foro do seu domicílio.
      </p>

      <h3>14. Contato</h3>
      <p>
        Dúvidas sobre estes Termos: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </article>
  );
}
