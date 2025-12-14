
export interface ResourceSeller {
  name: string;
  logo: string; // URL or Initials
}

export type ResourceBadgeColor = 'green' | 'orange' | 'blue' | 'red';

export interface ResourceBadge {
  label: string;
  color: ResourceBadgeColor;
}

export interface ResourceItem {
  id: string;
  title: string;
  seller: ResourceSeller;
  price: number;
  rating: number; // 0-5
  ratingCount: number;
  location: string;
  badges: ResourceBadge[];
  imageUrl: string;
  type: 'resource' | 'community';
  sharedWith?: { avatar: string }[];
}


export type ResourcesSidebarView = 'home' | 'cart' | 'bag' | 'rent' | 'notifications' | 'analytics';

export interface CartItem {
  id: string;
  resource: ResourceItem;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export type OrderType = 'purchase' | 'rent' | 'financial_aid' | 'rejected';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'rejected' | 'approved';

export interface Order {
  id: string;
  resource: ResourceItem;
  type: OrderType;
  status: OrderStatus;
  orderDate: Date;
  deliveryLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  quantity: number;
  totalPrice: number;
  sponsorName?: string; // For financial aid orders
}

export interface Sponsor {
  id: string;
  name: string;
  avatar: string;
  organization?: string;
  bio: string;
  totalSponsored: number; // Total amount in currency
  studentsHelped: number;
  isActive: boolean;
  categories: string[]; // Preferred categories to sponsor
  maxSponsorshipAmount?: number;
}

export type SponsorshipRequestStatus = 'pending' | 'approved' | 'rejected' | 'fulfilled';

export interface SponsorshipRequest {
  id: string;
  studentId: string;
  sponsorId: string;
  cartItems: CartItem[];
  totalAmount: number;
  message: string;
  status: SponsorshipRequestStatus;
  requestDate: Date;
  responseDate?: Date;
  sponsorMessage?: string;
}
