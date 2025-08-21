// API Service Class
class ApiService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    // Obtener encabezados predeterminados
    getHeaders() {
        return {
            ...API_CONFIG.DEFAULT_HEADERS
        };
    }

    // Método de solicitud HTTP genérico
    async request(BASE_URL, options = {}) {
        const url = `${this.baseUrl}${BASE_URL}`;
        const config = {
            headers: this.getHeaders(),
            ...options
        };

        // Agregar tiempo de espera
        const controller = new AbortController();
        config.signal = controller.signal;

        try {
            showLoading();
            
            if (ENV_CONFIG.DEBUG) {
                console.log(`API Request: ${options.method || 'GET'} ${url}`, config);
            }

            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (ENV_CONFIG.DEBUG) {
                console.log('API Response:', data);
            }

            // Si la respuesta tiene formato { success: true, data: [...] }, extraer los datos
            if (data && data.success && data.data !== undefined) {
                return data.data;
            }

            return data;
        } catch (error) {
            
            
            console.error('API Error:', error);
            throw error;
        } finally {
            hideLoading();
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE request
    async delete(endpoint) {
         return this.request(endpoint, { method: 'DELETE' });
    }
}


// Profesores API Service
class ProfesoresService extends ApiService {
    constructor() {
        super();
        this.endpoint = '/profesores';
    }

    async getAll() {
        return this.get(this.endpoint);
    }

    async getById(id) {
        return this.get(`${this.endpoint}/${id}`);
    }

    async create(profesor) {
        return this.post(this.endpoint, profesor);
    }

    async update(id, profesor) {
        return this.put(`${this.endpoint}/${id}`, profesor);
    }

    async deleteById(id) {
        return this.delete(`${this.endpoint}/${id}`);
    }

    async getByEspecialidad(especialidad) {
        return this.get(`${this.endpoint}/search?especialidad=${encodeURIComponent(especialidad)}`);
    }

    async getStats() {
        return this.get(`${this.endpoint}/stats`);
    }
}

// Estudiantes API Service
class EstudiantesService extends ApiService {
    constructor() {
        super();
        this.endpoint = '/estudiantes';
    }

    async getAll() {
        return this.get(this.endpoint);
    }

    async getById(id) {
        return this.get(`${this.endpoint}/${id}`);
    }

    async create(estudiante) {
        return this.post(this.endpoint, estudiante);
    }

    async update(id, estudiante) {
        return this.put(`${this.endpoint}/${id}`, estudiante);
    }

    async deleteById(id) {
        return this.delete(`${this.endpoint}/${id}`);
    }

    async getByNombre(nombre) {
        return this.get(`${this.endpoint}/search/nombre?nombre=${encodeURIComponent(nombre)}`);
    }

    async getByEmail(email) {
        return this.get(`${this.endpoint}/search/email?email=${encodeURIComponent(email)}`);
    }

    async getStats() {
        return this.get(`${this.endpoint}/stats`);
    }
}

// Cursos API Service
class CursosService extends ApiService {
    constructor() {
        super();
        this.endpoint = '/cursos';
    }

    async getAll() {
        return this.get(this.endpoint);
    }

    async getById(id) {
        return this.get(`${this.endpoint}/${id}`);
    }

    async create(curso) {
        return this.post(this.endpoint, curso);
    }

    async update(id, curso) {
        return this.put(`${this.endpoint}/${id}`, curso);
    }

    async deleteById(id) {
        return this.delete(`${this.endpoint}/${id}`);
    }

    async getByNombre(nombre) {
        return this.get(`${this.endpoint}/search/nombre?nombre=${encodeURIComponent(nombre)}`);
    }

    async getByProfesor(profesorId) {
        return this.get(`${this.endpoint}/profesor/${profesorId}`);
    }

    async getPopulares(limit = 10) {
        return this.get(`${this.endpoint}/populares?limit=${limit}`);
    }

    async getStats() {
        return this.get(`${this.endpoint}/stats`);
    }
}

// Inscripciones API Service
class InscripcionesService extends ApiService {
    constructor() {
        super();
        this.endpoint = '/inscripciones';
    }

    async getAll() {
        return this.get(this.endpoint);
    }

    async getById(id) {
        return this.get(`${this.endpoint}/${id}`);
    }

    async create(inscripcion) {
        return this.post(this.endpoint, inscripcion);
    }

    async update(id, inscripcion) {
        return this.put(`${this.endpoint}/${id}`, inscripcion);
    }

    async deleteById(id) {
        return this.delete(`${this.endpoint}/${id}`);
    }

    async getByEstudiante(estudianteId) {
        return this.get(`${this.endpoint}/estudiante/${estudianteId}`);
    }

    async getByCurso(cursoId) {
        return this.get(`${this.endpoint}/curso/${cursoId}`);
    }

    async verificarInscripcion(estudianteId, cursoId) {
        return this.get(`${this.endpoint}/verificar?estudianteId=${estudianteId}&cursoId=${cursoId}`);
    }

    async getStats() {
        return this.get(`${this.endpoint}/stats`);
    }
}

// Horarios API Service
class HorariosService extends ApiService {
    constructor() {
        super();
        this.endpoint = '/horarios';
    }

    async getAll() {
        return this.get(this.endpoint);
    }

    async getById(id) {
        return this.get(`${this.endpoint}/${id}`);
    }

    async create(horario) {
        return this.post(this.endpoint, horario);
    }

    async update(id, horario) {
        return this.put(`${this.endpoint}/${id}`, horario);
    }

    async deleteById(id) {
        return this.delete(`${this.endpoint}/${id}`);
    }

    async getByCurso(cursoId) {
        return this.get(`${this.endpoint}/curso/${cursoId}`);
    }

    async getByProfesor(profesorId) {
        return this.get(`${this.endpoint}/profesor/${profesorId}`);
    }

    async getByDia(dia) {
        return this.get(`${this.endpoint}/dia?dia=${encodeURIComponent(dia)}`);
    }

    async verificarDisponibilidad(cursoId, dia, horaInicio, horaFin) {
        return this.get(`${this.endpoint}/disponibilidad?cursoId=${cursoId}&dia=${encodeURIComponent(dia)}&horaInicio=${encodeURIComponent(horaInicio)}&horaFin=${encodeURIComponent(horaFin)}`);
    }

    async getStats() {
        return this.get(`${this.endpoint}/stats`);
    }
}

// Initialize services
const profesoresService = new ProfesoresService();
const estudiantesService = new EstudiantesService();
const cursosService = new CursosService();
const inscripcionesService = new InscripcionesService();
const horariosService = new HorariosService();
