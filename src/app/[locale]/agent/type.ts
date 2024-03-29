import { ListGpTsQuery } from '@yuntijs/arcadia-bff-sdk';

export type GPTNode = {
  __typename?: 'GPT';
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  hot?: any | null;
  creator?: string | null;
  category?: Array<string | null> | null;
  icon?: string | null;
  prologue?: string | null;
};

export type AgentData = ListGpTsQuery & {
  GPT?: {
    __typename?: 'GPTQuery';
    listGPT: {
      __typename?: 'PaginatedResult';
      nodes?: Array<GPTNode> | null;
    };
  } | null;
};

export interface AgentProps {
  agentData?: AgentData;
  TZH_AGENT_CATEGORY: string[];
}
