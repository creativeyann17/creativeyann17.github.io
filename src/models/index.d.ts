import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerArticle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Article, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly views?: number | null;
  readonly likes?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyArticle = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Article, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly views?: number | null;
  readonly likes?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Article = LazyLoading extends LazyLoadingDisabled ? EagerArticle : LazyArticle

export declare const Article: (new (init: ModelInit<Article>) => Article) & {
  copyOf(source: Article, mutator: (draft: MutableModel<Article>) => MutableModel<Article> | void): Article;
}