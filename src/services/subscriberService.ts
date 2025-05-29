
import { supabase } from '@/integrations/supabase/client';

export interface CreateSubscriberData {
  email: string;
  subscription_tier?: string;
  user_id?: string;
}

export interface UpdateSubscriberData {
  subscribed?: boolean;
  subscription_tier?: string;
  subscription_end?: string;
  stripe_customer_id?: string;
}

export const subscriberService = {
  async getSubscribers() {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createSubscriber(subscriberData: CreateSubscriberData) {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([subscriberData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSubscriber(id: string, subscriberData: UpdateSubscriberData) {
    const { data, error } = await supabase
      .from('subscribers')
      .update(subscriberData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSubscriber(id: string) {
    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getSubscriber(id: string) {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};
