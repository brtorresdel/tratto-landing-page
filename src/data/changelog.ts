export type ChangelogCategory = 'Lançamento' | 'Funcionalidade' | 'Melhoria' | 'Fundação';

export type ChangelogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'media'; src: string; alt: string; caption?: string }
  | { type: 'quote'; quote: string; author?: string }
  | { type: 'list'; title?: string; items: string[] };

export interface ChangelogEntry {
  date: string; // Formato YYYY-MM-DD
  displayDate: string; // Ex: "22 de Outubro de 2026"
  title: string;
  teaser: string;
  category: ChangelogCategory;
  badgeVariant?: 'active' | 'pending' | 'alert';
  initialLikes?: number;
  content: ChangelogBlock[];
}

export const changelogEntries: ChangelogEntry[] = [
  {
    date: '2026-10-22',
    displayDate: '22 de Outubro de 2026',
    title: 'Carta do Dev: contratos deveriam ser algo bom, e não uma dor de cabeça...',
    category: 'Fundação',
    badgeVariant: 'active',
    initialLikes: 1,
    teaser:
      'Alguns levam as dores pra terapia, outros desabafam com um amigo ou familiar. E eu decidi criar um produto digital. Quem diria, né?',
    content: [
      {
        type: 'paragraph',
        text: 'Olá! Se você estiver lendo isso, provavelmente eu oficializei na minha cabeça a ideia de seguir com esse projeto. Pra quem não me conhece, eu sou Bruno Torres, Desenvolvedor Fullstack e criador da Tratto (link das minhas redes sociais no rodapé dessa página). Se você já me conhece, não mudou muita coisa, prometo.',
      },
      {
        type: 'paragraph',
        text: 'Bem, desde quando entrei na área de programação (e tecnologia, de uma forma geral), sempre escutei e fui incentivado a "desenvolver ferramentas para ajudar a sociedade, agregar valor a algo ou alguém". E analisando minha carreira até o momento, reparei a ausência exatamente disso: algo que eu pudesse olhar e dizer, com confiança, que é minha contribuição real para o mundo.',
      },
      {
        type: 'paragraph',
        text: 'Cheguei à conclusão de que precisava fazer algo a respeito desse incômodo. Comecei a pensar que tipo de dor eu poderia ajudar a solucionar. Pensei, pensei... e lembrei de algo que me assombra até hoje: contratos (meu pai amado, chega arrepiei aqui só de escrever).',
      },
      {
        type: 'paragraph',
        text: 'Em duas das minhas maiores experiências profissionais antigas antes de me tornar oficialmente desenvolvedor, vivi momentos que beiravam o desespero quando o assunto era contrato. Não minto que, em algum momento, já cheguei até a chorar quando ouvia essa palavra.',
      },
      {
        type: 'paragraph',
        text: 'Em uma dessas experiências, os contratos eram gerados 100% na mão. Tínhamos um modelo guardado e, sempre que precisávamos gerar um novo documento para um cliente, era a mesma coisa: abrir o arquivo, trocar os dados "no olho", salvar com outro nome para não sobrescrever o original, imprimir e vida que segue. O resultado, como já dá para imaginar: arquivo salvo por cima do modelo, documento perdido, dados trocados de clientes anteriores... um caos.',
      },
      {
        type: 'paragraph',
        text: 'Na outra empresa, até tínhamos uma alternativa "semiautomática": uma planilha cheia de macros que gerava o documento. Mas, sendo bem honesto, uma planilha definitivamente não foi feita para isso, né? Além de ser offline, tínhamos problemas constantes de versões conflitantes e dores de cabeça para gerenciar tudo.',
      },
      {
        type: 'paragraph',
        text: 'Incomodado com isso, fui pesquisar a fundo para entender como esse calo aperta em outras empresas e segmentos. E, com esse levantamento, encontrei um verdadeiro espaço em branco no Brasil.',
      },
      {
        type: 'paragraph',
        text: 'Não que a ideia de automatizar contratos seja 100% inédita no planeta; mas uma solução nacional, simples, acessível e desenhada de verdade para a realidade de micro e pequenas empresas simplesmente não existia.',
      },
      {
        type: 'paragraph',
        text: 'E foi exatamente aqui que a minha ideia de projeto nasceu. E como todo bom projeto deste que vos fala, ele precisaria ter um nome. Esse aqui é bem simples de entender, pra falar a verdade:',
      },
      {
        type: 'paragraph',
        text: 'Contratos nada mais são do que acordos firmados entre duas ou mais partes. Independente de ser algo formal ou até mesmo informal, um contrato nada mais é do que uma forma juridicamente válida de se combinar um... *Tratto*! A palavra termina com trato gente, olha que inovador e revolucionário (~contém ironia aqui~)!',
      },
      {
        type: 'paragraph',
        text: 'A Tratto nasce para preencher essa lacuna: uma plataforma onde você sobe seus próprios modelos de contrato em .docx com marcadores simples, gera documentos de forma rápida e sem erro de preenchimento e acompanha todo o ciclo de vigência e reajustes sem depender de planilhas.',
      },
      {
        type: 'paragraph',
        text: 'Estou seguindo animado com o desenvolvimento da Tratto (nas minhas horas vagas, claro - eu ainda preciso trabalhar), e sinceramente: sinto que dei um abraço naquele Bruno do passado que passou por poucas e boas mexendo com esse tipo de documento...',
      },
    ],
  },
];

export function getAllChangelogEntries(): ChangelogEntry[] {
  return [...changelogEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getChangelogEntryByDate(date: string): ChangelogEntry | undefined {
  return changelogEntries.find((entry) => entry.date === date);
}
