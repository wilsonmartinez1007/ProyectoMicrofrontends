// src/app/compras.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compra {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
  fecha: string;
  estado: 'PENDIENTE' | 'PAGADA' | 'CANCELADA';
}

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}/compras/`, {
      headers: this.getAuthHeaders(),
    });
  }

  crearCompra(data: {
    codigo: string;
    nombre: string;
    precio: number;
    cantidad: number;
  }): Observable<Compra> {
    return this.http.post<Compra>(`${this.apiUrl}/compras/`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  actualizarCompra(
    id: number,
    data: { codigo: string; nombre: string; precio: number; cantidad: number }
  ): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiUrl}/compras/${id}/`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  eliminarCompra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/compras/${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  cambiarEstado(id: number, estado: string): Observable<Compra> {
    return this.http.patch<Compra>(
      `${this.apiUrl}/compras/${id}/estado/`,
      { estado },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
