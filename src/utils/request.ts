import axios from 'axios'
export interface EntryInterface {
  articleId: number;
  author: string;
  title: string;
  createdAt: string;
  label: string;
}

export const getEntryList = async function (): Promise<EntryInterface[]> {
  return [
    {
      articleId: 1,
      author: 'PH',
      title: 'first title',
      createdAt: '2021-09-10T08:39:19Z',
      label: '',
    },
    {
      articleId: 2,
      author: 'PH',
      title: 'second title',
      createdAt: '2021-09-10T08:39:19Z',
      label: '',
    },
  ];
};

export const getFiles = async function (path: string){
  return await axios.get(path)
}

export default {
  getEntryList,
  getFiles,
};
