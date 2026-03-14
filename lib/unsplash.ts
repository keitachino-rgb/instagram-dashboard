// Unsplash API 連携コード

export interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  description: string | null;
  username: string;
  links: {
    html: string;
  };
}

export interface UnsplashResponse {
  results: Array<{
    id: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    description: string | null;
    alt_description: string | null;
    user: {
      username: string;
      name: string;
    };
    links: {
      html: string;
      download: string;
    };
  }>;
}

// 環境変数からAPIキーを取得
const UNSPLASH_API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;

/**
 * Unsplash APIで画像を検索
 * @param keyword 検索キーワード
 * @param page ページ番号（デフォルト1）
 * @param perPage 1ページあたりの結果数（デフォルト12）
 * @returns 画像配列
 */
export async function searchUnsplashImages(
  keyword: string,
  page: number = 1,
  perPage: number = 12
): Promise<UnsplashImage[]> {
  if (!UNSPLASH_API_KEY) {
    console.warn('NEXT_PUBLIC_UNSPLASH_API_KEY is not set');
    return [];
  }

  if (!keyword || keyword.trim() === '') {
    return [];
  }

  try {
    const url = new URL('https://api.unsplash.com/search/photos');
    url.searchParams.append('query', keyword);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('client_id', UNSPLASH_API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error(`Unsplash API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: UnsplashResponse = await response.json();

    return data.results.map((image) => ({
      id: image.id,
      url: image.urls.regular,
      thumb: image.urls.small,
      description: image.description || image.alt_description,
      username: image.user.username,
      links: {
        html: image.links.html,
      },
    }));
  } catch (error) {
    console.error('Failed to search Unsplash images:', error);
    return [];
  }
}

/**
 * ダミー画像データを返す（APIキーがない場合の代替）
 */
export function getDummyImages(keyword: string): UnsplashImage[] {
  const dummyImages: UnsplashImage[] = [
    {
      id: 'dummy-1',
      url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200&h=200&fit=crop',
      description: 'Fashion item',
      username: 'unsplash-user',
      links: { html: 'https://unsplash.com' },
    },
    {
      id: 'dummy-2',
      url: 'https://images.unsplash.com/photo-1505631346881-b72b27e84530?w=500&h=500&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1505631346881-b72b27e84530?w=200&h=200&fit=crop',
      description: 'Product showcase',
      username: 'unsplash-user',
      links: { html: 'https://unsplash.com' },
    },
    {
      id: 'dummy-3',
      url: 'https://images.unsplash.com/photo-1523779915324-ef14624c8b64?w=500&h=500&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1523779915324-ef14624c8b64?w=200&h=200&fit=crop',
      description: 'Lifestyle',
      username: 'unsplash-user',
      links: { html: 'https://unsplash.com' },
    },
    {
      id: 'dummy-4',
      url: 'https://images.unsplash.com/photo-1488554889774-84c540531d60?w=500&h=500&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1488554889774-84c540531d60?w=200&h=200&fit=crop',
      description: 'Summer collection',
      username: 'unsplash-user',
      links: { html: 'https://unsplash.com' },
    },
    {
      id: 'dummy-5',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=500&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=200&fit=crop',
      description: 'Spring lookbook',
      username: 'unsplash-user',
      links: { html: 'https://unsplash.com' },
    },
  ];

  return dummyImages;
}
