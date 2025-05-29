
import { supabase } from '@/integrations/supabase/client';

export interface CatalogSettings {
  id: string;
  company_id: string;
  enabled: boolean;
  custom_domain?: string;
  theme_settings: any;
  seo_settings: any;
  created_at: string;
  updated_at: string;
}

export interface UpdateCatalogData {
  enabled?: boolean;
  custom_domain?: string;
  theme_settings?: any;
  seo_settings?: any;
}

export const catalogService = {
  async getCatalogSettings(): Promise<CatalogSettings> {
    const { data, error } = await supabase
      .from('catalog_settings')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  async updateCatalogSettings(data: UpdateCatalogData): Promise<CatalogSettings> {
    const { data: result, error } = await supabase
      .from('catalog_settings')
      .update(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async toggleCatalogStatus(): Promise<CatalogSettings> {
    const current = await this.getCatalogSettings();
    return this.updateCatalogSettings({ enabled: !current.enabled });
  },

  async getCompanyBySubdomain(subdomain: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('subdomain', subdomain)
      .single();

    if (error) {
      console.error('Error fetching company by subdomain:', error);
      return null;
    }

    return data;
  }
};
