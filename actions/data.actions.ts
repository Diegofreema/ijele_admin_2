'use server';

import { createClient } from '../util/supabase/server';
import { revalidatePath } from 'next/cache';
import { MatchType, MemberType, PType, TicketType, TypeMen } from '../types';
import { generateRandomString } from 'utils/helper';
import { cookies } from 'next/headers';

export const getTotalPlayers = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('men')
    .select('*', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message);
  }

  return {
    numberOfPlayers: count,
  };
};

export const getTotalNews = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('news')
    .select('*', { count: 'exact', head: true });
  if (error) {
    console.log('fdsfds', error);
    throw new Error(error.message);
  }

  return {
    numberOfArticles: count,
  };
};
export const getTotalProducts = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message);
  }

  return count;
};
export const getTotalImages = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('images')
    .select('*', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message);
  }

  return {
    numberOfImages: count,
  };
};
export const getTotalVideos = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('videos')
    .select('*', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message);
  }

  return {
    numberOfVideos: count,
  };
};
export const getTotalMembers = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .neq('userId', null);
  if (error) {
    throw new Error(error.message);
  }

  return count;
};
export const getTotalMatches = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('matches')
    .select('*', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message);
  }

  return count;
};

export const getMatches = async () => {
  const suapabase = createClient();
  const date = new Date();
  const isoDate = date.toISOString().split('T')[0];
  const timestamp = date.getTime();
  const { data, error } = await suapabase
    .from('matches')
    .select('*')
    .eq('RESULT', 'upcoming')
    .limit(3);
  if (error) {
    throw new Error(error.message);
  }

  return {
    matches: data,
  };
};
export const getAllMatches = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 10;
  const offset = page * limit;
  const { data, error } = await suapabase
    .from('matches')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(offset);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getSingleMatch = async (id: number) => {
  const suapabase = createClient();

  const { data, error } = await suapabase
    .from('matches')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const editMatch = async (matches: MatchType, id: number) => {
  const suapabase = createClient();
  const { error } = await suapabase
    .from('matches')
    .update({
      attendance: matches.attendance,
      date_of_match: matches.date_of_match,
      kick_off: matches.kick_off,
      away_score: matches.away_score,
      away_team: matches.away_team,
      venue: matches.venue,
      ref_name: matches.ref_name,

      away_team_image: matches.away_team_img,
      home_score: matches.home_score,
      home_team: matches.home_team,
      home_team_img: matches.home_team_img,
      ticket_available: matches?.ticket_available,
      ticket_price: matches?.ticket_price,
      league: matches?.league,
      RESULT: matches?.match_result,
      vip_price: matches.vip_price,
      vvip_price: matches.vvip_price,
    })
    .eq('id', id);

  if (error) {
    return { message: 'failed', error: error.message };
  }

  revalidatePath('/site/matches');
  revalidatePath(`/site/matches/${id}`);
  return { message: 'success' };
};
export const createMatch = async (matches: MatchType) => {
  const suapabase = createClient();
  // @ts-ignore
  const { error } = await suapabase.from('matches').insert({
    attendance: matches.attendance,
    date_of_match: matches.date_of_match,
    kick_off: matches.kick_off,
    away_score: matches.away_score,
    away_team: matches.away_team,
    venue: matches.venue,
    ref_name: matches.ref_name,
    home_score: matches.home_score,
    home_team: matches.home_team,
    home_team_img: matches.home_team_img,
    league: matches.league,
    RESULT: matches.match_result,
    away_team_image: matches.away_team_img,
    ticket_available: matches?.ticket_available,
    ticket_price: matches?.ticket_price,
    vip_price: matches.vip_price,
    vvip_price: matches.vvip_price,
  });

  if (error) {
    console.log('error', error.message);

    return { message: 'failed', error: error.message };
  }

  revalidatePath('/site/events');

  return { message: 'success' };
};

export const getImages = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 10;
  const offset = page * limit;
  const { data, error } = await suapabase.from('images').select().limit(offset);
  if (error) {
    console.log('fdsfds', error);

    throw new Error(error.message);
  }

  return {
    data,
  };
};
export const getNews = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 10;
  const offset = page * limit;
  const { data, error } = await suapabase.from('news').select().limit(offset);
  if (error) {
    console.log('fdsfds', error);

    throw new Error(error.message);
  }

  return data;
};
export const getPlayers = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 10;
  const offset = page * limit;
  const { data, error } = await suapabase.from('men').select().limit(offset);
  if (error) {
    console.log('fdsfds', error);

    throw new Error(error.message);
  }

  return data;
};
export const getSingleNews = async (id: any) => {
  const suapabase = createClient();

  const { data, error } = await suapabase
    .from('news')
    .select()
    .eq('id', id)
    .single();
  if (error) {
    return { message: 'Article not found' };
  }

  return data;
};
export const getSinglePlayer = async (id: any) => {
  const suapabase = createClient();

  const { data, error } = await suapabase
    .from('men')
    .select()
    .eq('id', id)
    .single();
  if (error) {
    return { message: 'Player not found' };
  }

  return data;
};
export const getVideos = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 10;
  const offset = page * limit;
  const { data, error } = await suapabase.from('videos').select().limit(offset);
  if (error) {
    console.log('fdsfds', error);

    throw new Error(error.message);
  }

  return {
    data,
  };
};

export const editProduct = async (product: PType) => {
  const suapabase = createClient();

  const { error } = await suapabase
    .from('products')
    .update({
      image_url: product.image_url,
      price: product.price,
      number_in_stock: product.number_in_stock,
      product_name: product.product_name,
      description: product.description,
    })
    .eq('id', product.id);
  if (error) {
    console.log('fdsfds', error);
    return { message: 'Failed to update product', error: error };
  }
  revalidatePath(`/site/shop/${product.id}`);
  revalidatePath(`/site/shop`);

  return {
    message: 'Product updated successfully',
  };
};
export const editPlayer = async (player: TypeMen, id: number) => {
  const suapabase = createClient();

  const { error } = await suapabase
    .from('men')
    .update({
      ...player,
    })
    .eq('id', id);
  if (error) {
    console.log('fdsfds', error);
    return { message: 'Failed to update product', error: error.message };
  }
  revalidatePath(`/site/players/${id}`);
  revalidatePath(`/site/players`);

  return {
    message: 'Player updated successfully',
  };
};
export const createProduct = async (product: PType) => {
  const suapabase = createClient();

  const { error } = await suapabase.from('products').insert({
    image_url: product.image_url,
    price: product.price,
    number_in_stock: product.number_in_stock,
    product_name: product.product_name,
    description: product.description,
    category: product.category,
  });
  if (error) {
    console.log('fdsfds', error);
    return { message: 'failed', error: error };
  }

  revalidatePath(`/site/shop`);

  return {
    message: 'success',
  };
};
export const createPlayer = async (player: TypeMen) => {
  const suapabase = createClient();
  const {
    DUTY,
    ROLE,
    age,
    bio,
    last_name,
    contract_end_date,
    contract_start_date,
    contract_type,
    first_name,
    height,
    image_url,
    injured,
    jersey_number,
    leave,
    lga,
    loan_away,
    loan_home,
    middle_name,
    nationality,
    wage_per_week,
    weight,
    skill_descriptions,
    state_of_origin,
    suspended,
  } = player;
  // @ts-ignore
  const { error } = await suapabase.from('men').insert({
    age,
    contract_end_date,
    contract_start_date,
    first_name,
    height,
    image_url,
    jersey_number,
    last_name,
    lga,
    nationality,
    state_of_origin,
    wage_per_week,
    weight,
    bio,
    loan_away,
    loan_home,
    leave,
    skill_descriptions,
    DUTY,
    ROLE,
    middle_name,
    injured,
    suspended,
    contract_type,
  });
  if (error) {
    console.log('fdsfds', error);
    return { message: 'failed', error: error.message };
  }

  revalidatePath(`/site/players`);

  return {
    message: 'Successfully created player',
  };
};
export const getProducts = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 10;
  const offset = page * limit;
  const { data, error } = await suapabase
    .from('products')
    .select()
    .limit(offset);
  if (error) {
    console.log('fdsfds', error);

    throw new Error(error.message);
  }

  return data;
};
export const getSingleProduct = async (id: number) => {
  const suapabase = createClient();

  const { data, error } = await suapabase
    .from('products')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.log('fdsfds', error);
    throw new Error(error.message);
  }

  return data;
};
export const deleteImage = async (id: any) => {
  const suapabase = createClient();

  const { error } = await suapabase.from('images').delete().eq('id', id);
  if (error) {
    console.log('fdsfds', error);

    return { message: 'failed to delete' };
  }
  revalidatePath('/site/images');
  return {
    message: 'success',
  };
};

export const deleteVideo = async (id: any) => {
  const suapabase = createClient();
  const { error } = await suapabase.from('videos').delete().eq('id', id);
  if (error) {
    console.log('fdsfds', error);

    return { message: 'failed to delete' };
  }
  revalidatePath('/site/videos');
  return {
    message: 'success',
  };
};

export const deleteNews = async (id: any) => {
  const suapabase = createClient();
  const { error } = await suapabase.from('news').delete().eq('id', id);
  if (error) {
    console.log('fdsfds', error);

    return { message: 'failed to delete' };
  }
  revalidatePath('/site/news');
  return {
    message: 'success',
  };
};

export const deleteProduct = async (id: number) => {
  const suapabase = createClient();
  const { error } = await suapabase.from('products').delete().eq('id', id);
  if (error) {
    console.log('fdsfds', error);

    return { message: 'failed to delete', error: error };
  }
  revalidatePath('/site/shop');
  return {
    message: 'success',
  };
};

export const getOrders = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 20;
  const offset = page * limit;
  const { data, error } = await suapabase.from('orders').select().limit(offset);
  if (error) {
    throw new Error('Failed to get orders');
  }

  return data;
};

export const getOrderCount = async () => {
  const suapabase = createClient();
  const { count, error } = await suapabase
    .from('orders')
    .select('*', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message);
  }

  return count;
};

export const getSingleOrder = async (orderId: number) => {
  const suapabase = createClient();
  const { data, error } = await suapabase
    .from('order_items')
    .select('*, productId(*)')
    .eq('order_id', orderId);

  if (error) {
    console.log('dsg', error);
    throw new Error('Failed to fetch order');
  }

  return data;
};

export const updateOrder = async (
  orderId: number,
  status: 'pending' | 'completed' | 'canceled',
) => {
  const suapabase = createClient();
  const { error } = await suapabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.log('dsg', error);
    return { message: 'failed' };
  }
  revalidatePath('/site/orders');
  return { message: 'success' };
};

export const getMembers = async (page: number = 1) => {
  const suapabase = createClient();
  const limit = 20;
  const offset = page * limit;
  const { data, error } = await suapabase
    .from('users')
    .select('*')
    .neq('userId', null)
    .limit(offset);

  if (error) {
    console.log('sf', error);

    throw new Error('Failed to fetch members');
  }

  return data;
};

export const getSearch = async () => {
  const suapabase = createClient();

  const { data, error } = await suapabase.from('users').select('*');

  if (error) {
    console.log('sf', error);

    throw new Error('Failed to fetch members');
  }

  return { data };
};

export const getSingleUser = async (userId: string) => {
  const suapabase = createClient();
  const { data, error } = await suapabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) {
    throw new Error('Failed to get profile');
  }
  return data;
};

export const addNewMember = async (member: MemberType) => {
  const supabase = createClient();
  try {
    let userId = '';
    let isUsed = false;

    do {
      const id = generateRandomString();
      const { data: dt, error } = await supabase
        .from('users')
        .select()
        .eq('userId', id);

      if (error) {
        console.log('Error:', error);
        return { message: 'failed' };
      }
      if (dt?.length > 0) {
        isUsed = true;
      } else if (dt?.length === 0) {
        isUsed = false;
        userId = id;
      }
    } while (isUsed);
    const { error } = await supabase
      .from('users')
      .insert({ ...member, userId, verified: true });
    if (error) {
      return { message: 'failed' };
    }
    revalidatePath('/site/members');
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'failed' };
  }
};
export const updateMember = async (member: MemberType) => {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from('users')
      .update(member)
      .eq('userId', member.userId);
    if (error) {
      return { message: 'failed' };
    }
    revalidatePath('/site/members');
    revalidatePath(`/site/members/${member.userId}`);

    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'failed' };
  }
};

export const getTicket = async (id: number): Promise<TicketType[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ticket')
    .select()
    .eq('match_id', id);
  if (error) {
    throw new Error('Failed to load tickets');
  }

  return data;
};

export const getPaginatedTickets = async (
  page: number = 1,
  id: number,
): Promise<TicketType[]> => {
  const suapabase = createClient();
  const limit = 20;
  const offset = page * limit;
  const { data, error } = await suapabase
    .from('ticket')
    .select('*')
    .eq('match_id', id)
    .limit(offset);

  if (error) {
    console.log('sf', error);

    throw new Error('Failed to fetch tickets');
  }

  return data;
};

export const updateTicketStatus = async (id: number, matchId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('ticket')
    .update({ redeemed: true })
    .eq('id', id);
  if (error) {
    console.log(error);
    return { message: 'failed' };
  }
  // revalidatePath(`/site/events/tickets?id=${matchId}`);
  return { message: 'success' };
};

export const login = async (username: string, password: string) => {
  console.log(username, password);

  const supabase = createClient();
  const { data, error } = await supabase
    .from('admin')
    .select()
    .eq('username', username)
    .eq('password', password)
    .single();
  if (error) {
    console.log(error);
    return { message: 'failed' };
  }
  cookies().set('userId', data?.id.toString());
  return { message: 'success' };
};
