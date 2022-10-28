--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    comment character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    follower_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name character varying(279) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    link text NOT NULL,
    description character varying(500),
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts_hashtags (
    id integer NOT NULL,
    post_id integer NOT NULL,
    hashtag_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_hashtags_id_seq OWNED BY public.posts_hashtags.id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    valid boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shares (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: shares_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shares_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shares_id_seq OWNED BY public.shares.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    password text NOT NULL,
    image text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: posts_hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_hashtags ALTER COLUMN id SET DEFAULT nextval('public.posts_hashtags_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shares id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares ALTER COLUMN id SET DEFAULT nextval('public.shares_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES (1, 2, 18, 'adooooo', '2022-10-25 21:25:36.273038');
INSERT INTO public.comments VALUES (2, 3, 18, 'gerso gerso', '2022-10-25 21:57:09.948801');
INSERT INTO public.comments VALUES (3, 2, 18, 'blablabal', '2022-10-26 20:50:46.196577');
INSERT INTO public.comments VALUES (4, 2, 18, 'gersada???', '2022-10-26 23:37:26.413449');
INSERT INTO public.comments VALUES (5, 3, 50, 'gerso', '2022-10-28 16:00:29.925828');


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.followers VALUES (1, 3, 2, '2022-10-28 13:47:59.8192');
INSERT INTO public.followers VALUES (2, 2, 3, '2022-10-28 16:00:18.291093');


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (4, 'bagre', '2022-10-21 19:56:43.717302');
INSERT INTO public.hashtags VALUES (5, 'bob', '2022-10-23 13:28:28.804581');
INSERT INTO public.hashtags VALUES (6, 'amigo', '2022-10-24 16:20:00.25545');
INSERT INTO public.hashtags VALUES (7, 'tallis', '2022-10-24 16:20:00.287964');
INSERT INTO public.hashtags VALUES (8, 'ado', '2022-10-24 16:28:10.174823');
INSERT INTO public.hashtags VALUES (9, '1', '2022-10-28 12:58:04.743799');
INSERT INTO public.hashtags VALUES (10, 'esporte', '2022-10-28 13:48:14.769554');
INSERT INTO public.hashtags VALUES (11, 'gersada', '2022-10-28 13:48:14.782178');
INSERT INTO public.hashtags VALUES (12, 'SERA', '2022-10-28 14:00:27.543486');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (3, 8, 2, '2022-10-21 20:00:11.66213');
INSERT INTO public.likes VALUES (4, 8, 3, '2022-10-21 21:11:12.05138');
INSERT INTO public.likes VALUES (6, 8, 4, '2022-10-21 21:25:47.464556');
INSERT INTO public.likes VALUES (11, 8, 5, '2022-10-21 21:29:46.500339');
INSERT INTO public.likes VALUES (14, 9, 6, '2022-10-21 21:31:38.978629');
INSERT INTO public.likes VALUES (15, 8, 7, '2022-10-21 22:02:44.147357');
INSERT INTO public.likes VALUES (16, 9, 2, '2022-10-21 23:29:29.797392');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (9, 6, 'https://ge.globo.com', 'Bagre momento', '2022-10-21 21:31:34.95493');
INSERT INTO public.posts VALUES (8, 2, 'https://www.youtube.com', 'Braborrrrfasfasfasassadasadsggg', '2022-10-21 19:58:43.912299');
INSERT INTO public.posts VALUES (13, 2, 'https://ge.globo.com/', 'pataquada #bagre', '2022-10-23 13:15:45.319855');
INSERT INTO public.posts VALUES (14, 2, 'https://ge.globo.com/', '#bagre #bob #bob#bagre', '2022-10-23 13:28:28.933594');
INSERT INTO public.posts VALUES (16, 2, 'https://g1.globo.com/', 'agshgahsoighiaosghioasiahgsioahsgohasioghaiosghoiashgioahgioahsioghasioghaisoghioashgoiashgoiahgoiahsioghasoighasghoiashgoiahsoighasiog #bagre', '2022-10-24 16:18:39.561809');
INSERT INTO public.posts VALUES (17, 2, 'https://ge.globo.com/', 'um texto qualquer para o meu #amigo #tallis um texto qualquer para o meu #amigo #tallis um texto qualquer para o meu #amigo #tallis um texto qualquer para o meu #amigo #tallis um texto qualquer para o meu #amigo #tallis ', '2022-10-24 16:20:00.384205');
INSERT INTO public.posts VALUES (18, 2, 'https://www.youtube.com/watch?v=LVgCDkzSJwI', '#ado', '2022-10-24 16:28:10.264905');
INSERT INTO public.posts VALUES (19, 2, 'https://g1.globo.com/', '', '2022-10-28 12:38:10.944885');
INSERT INTO public.posts VALUES (20, 2, 'https://ge.globo.com/', '', '2022-10-28 12:38:15.061615');
INSERT INTO public.posts VALUES (21, 2, 'https://www.youtube.com', '', '2022-10-28 12:38:19.63608');
INSERT INTO public.posts VALUES (22, 2, 'https://www.wikipedia.com/1', '', '2022-10-28 12:39:20.417252');
INSERT INTO public.posts VALUES (23, 2, 'https://www.wikipedia.com/2', '', '2022-10-28 12:39:27.959182');
INSERT INTO public.posts VALUES (24, 2, 'https://www.wikipedia.com/3', '', '2022-10-28 12:39:34.500207');
INSERT INTO public.posts VALUES (25, 2, 'https://www.wikipedia.com/4', '', '2022-10-28 12:40:09.427749');
INSERT INTO public.posts VALUES (26, 2, 'https://www.wikipedia.com/5', '', '2022-10-28 12:42:41.794353');
INSERT INTO public.posts VALUES (27, 2, 'https://www.wikipedia.com/6', '', '2022-10-28 12:44:48.325201');
INSERT INTO public.posts VALUES (28, 2, 'https://www.wikipedia.com/1', '#1', '2022-10-28 12:58:04.788028');
INSERT INTO public.posts VALUES (29, 2, 'https://www.wikipedia.com/2', '#1', '2022-10-28 12:58:19.113618');
INSERT INTO public.posts VALUES (30, 2, 'https://www.wikipedia.com/3', '#1', '2022-10-28 12:58:29.437861');
INSERT INTO public.posts VALUES (31, 2, 'https://www.wikipedia.com/4', '#1', '2022-10-28 12:58:36.774063');
INSERT INTO public.posts VALUES (32, 2, 'https://www.wikipedia.com/5', '#1', '2022-10-28 12:58:45.055215');
INSERT INTO public.posts VALUES (33, 2, 'https://www.wikipedia.com/6', '#1', '2022-10-28 12:58:55.283988');
INSERT INTO public.posts VALUES (34, 2, 'https://www.wikipedia.com/7', '#1', '2022-10-28 12:59:04.281004');
INSERT INTO public.posts VALUES (35, 2, 'https://www.wikipedia.com/8', '#1', '2022-10-28 12:59:11.320267');
INSERT INTO public.posts VALUES (36, 2, 'https://www.wikipedia.com/9', '#1', '2022-10-28 12:59:18.537479');
INSERT INTO public.posts VALUES (37, 2, 'https://www.wikipedia.com/10', '#1', '2022-10-28 12:59:25.04083');
INSERT INTO public.posts VALUES (38, 2, 'https://www.wikipedia.com/11', '#1', '2022-10-28 12:59:30.871532');
INSERT INTO public.posts VALUES (39, 2, 'https://ge.globo.com/', '#esporte #gersada', '2022-10-28 13:48:14.789895');
INSERT INTO public.posts VALUES (40, 2, 'https://g1.globo.com/', 'fasfsa', '2022-10-28 13:48:34.038577');
INSERT INTO public.posts VALUES (41, 2, 'https://www.wikipedia.com/3', '#SERA', '2022-10-28 14:00:27.606394');
INSERT INTO public.posts VALUES (42, 2, 'https://ge.globo.com/', 'gasgasg', '2022-10-28 14:03:29.703968');
INSERT INTO public.posts VALUES (43, 2, 'https://ge.globo.com/', 'hjkhkgkgkg', '2022-10-28 14:05:02.458345');
INSERT INTO public.posts VALUES (44, 2, 'https://ge.globo.com/', 'haishgihglihilghoihgilg', '2022-10-28 14:07:25.958534');
INSERT INTO public.posts VALUES (45, 2, 'https://ge.globo.com/', 'afsklhfiashflkasf', '2022-10-28 14:13:52.819704');
INSERT INTO public.posts VALUES (46, 2, 'https://ge.globo.com/', '', '2022-10-28 14:24:11.526906');
INSERT INTO public.posts VALUES (47, 2, 'https://ge.globo.com/', 'hhhhh', '2022-10-28 14:26:53.147506');
INSERT INTO public.posts VALUES (48, 2, 'https://ge.globo.com/', 'jhljkhklhl', '2022-10-28 14:33:51.967521');
INSERT INTO public.posts VALUES (49, 2, 'https://g1.globo.com/', 'fasfasfsafas #bagre', '2022-10-28 14:34:20.792899');
INSERT INTO public.posts VALUES (50, 2, 'https://ge.globo.com/', 'alo', '2022-10-28 14:36:56.521365');


--
-- Data for Name: posts_hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts_hashtags VALUES (13, 13, 4, '2022-10-23 13:15:45.3301');
INSERT INTO public.posts_hashtags VALUES (14, 14, 4, '2022-10-23 13:28:28.950098');
INSERT INTO public.posts_hashtags VALUES (15, 14, 5, '2022-10-23 13:28:28.991258');
INSERT INTO public.posts_hashtags VALUES (18, 16, 4, '2022-10-24 16:18:39.715914');
INSERT INTO public.posts_hashtags VALUES (19, 17, 6, '2022-10-24 16:20:00.397708');
INSERT INTO public.posts_hashtags VALUES (20, 17, 7, '2022-10-24 16:20:00.43644');
INSERT INTO public.posts_hashtags VALUES (21, 17, 6, '2022-10-24 16:20:00.4986');
INSERT INTO public.posts_hashtags VALUES (22, 17, 6, '2022-10-24 16:20:00.556995');
INSERT INTO public.posts_hashtags VALUES (23, 17, 7, '2022-10-24 16:20:00.557997');
INSERT INTO public.posts_hashtags VALUES (24, 17, 7, '2022-10-24 16:20:00.557169');
INSERT INTO public.posts_hashtags VALUES (25, 17, 7, '2022-10-24 16:20:00.556723');
INSERT INTO public.posts_hashtags VALUES (26, 17, 6, '2022-10-24 16:20:00.597376');
INSERT INTO public.posts_hashtags VALUES (27, 17, 6, '2022-10-24 16:20:00.598881');
INSERT INTO public.posts_hashtags VALUES (28, 17, 7, '2022-10-24 16:20:00.599941');
INSERT INTO public.posts_hashtags VALUES (29, 18, 8, '2022-10-24 16:28:10.301583');
INSERT INTO public.posts_hashtags VALUES (30, 28, 9, '2022-10-28 12:58:04.821767');
INSERT INTO public.posts_hashtags VALUES (31, 29, 9, '2022-10-28 12:58:19.124713');
INSERT INTO public.posts_hashtags VALUES (32, 30, 9, '2022-10-28 12:58:29.451158');
INSERT INTO public.posts_hashtags VALUES (33, 31, 9, '2022-10-28 12:58:36.785719');
INSERT INTO public.posts_hashtags VALUES (34, 32, 9, '2022-10-28 12:58:45.070533');
INSERT INTO public.posts_hashtags VALUES (35, 33, 9, '2022-10-28 12:58:55.298391');
INSERT INTO public.posts_hashtags VALUES (36, 34, 9, '2022-10-28 12:59:04.290962');
INSERT INTO public.posts_hashtags VALUES (37, 35, 9, '2022-10-28 12:59:11.334193');
INSERT INTO public.posts_hashtags VALUES (38, 36, 9, '2022-10-28 12:59:18.555692');
INSERT INTO public.posts_hashtags VALUES (39, 37, 9, '2022-10-28 12:59:25.052922');
INSERT INTO public.posts_hashtags VALUES (40, 38, 9, '2022-10-28 12:59:30.87884');
INSERT INTO public.posts_hashtags VALUES (41, 39, 10, '2022-10-28 13:48:14.799241');
INSERT INTO public.posts_hashtags VALUES (42, 39, 11, '2022-10-28 13:48:14.829062');
INSERT INTO public.posts_hashtags VALUES (43, 41, 12, '2022-10-28 14:00:27.648932');
INSERT INTO public.posts_hashtags VALUES (44, 49, 4, '2022-10-28 14:34:20.811138');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (3, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY2MzkyOTU3fQ.3j4oOb5lJpwDXhL0Yz-GLm4zKkrozJwkQrsInHAtcSA', true, '2022-10-21 19:55:57.457285');
INSERT INTO public.sessions VALUES (4, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY2Mzk3NDY0fQ.2N1YtNsucjHsu9ffyERzn5nuPf_cahXtjN3ayO_1UoI', true, '2022-10-21 21:11:04.722468');
INSERT INTO public.sessions VALUES (5, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY2Mzk4MzQxfQ.WJkhmMmsdJnLhJ1c0KtjcJdqKlkRgTpDuQ28EJqQBLU', true, '2022-10-21 21:25:41.450109');
INSERT INTO public.sessions VALUES (6, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjY2Mzk4NTgyfQ.oGvzQpHjARbNdVsjhQTI6BxlI0V5bXN7ovNcuYiVR78', true, '2022-10-21 21:29:42.433771');
INSERT INTO public.sessions VALUES (7, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjY2Mzk4NjYyfQ.8YP2w5NgXZy-nSaYSuWUF0ar1pU0uIqPtB9goE8gK7c', true, '2022-10-21 21:31:02.063246');
INSERT INTO public.sessions VALUES (8, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY2NDAwNTU2fQ.uMMkHwi9gfeRnqiw9hoYyAziqz7s-a4FSyNIIaa0qVw', true, '2022-10-21 22:02:36.246681');
INSERT INTO public.sessions VALUES (9, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY2NDU5NDE5fQ._magimb3v2DMoNZOUYsRLchnYRaALxCe_JfHwkKZFa0', true, '2022-10-22 14:23:39.109985');
INSERT INTO public.sessions VALUES (10, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY2NDczNDgzfQ.xag0PVzsO7DqEGO8f_gXYDZQGWQ_6onH8caQjGc3N74', true, '2022-10-22 18:18:03.949973');
INSERT INTO public.sessions VALUES (11, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY2NTc0ODM2fQ.usVzWm1Zg_mgUEQV_P0Uoxf8Q0sDi2t7Ms6BytguNJU', true, '2022-10-23 22:27:16.753815');
INSERT INTO public.sessions VALUES (12, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY2OTc1NjY1fQ.9PGm4RvFQQZ8-FGb10nweGTRKArVZr--12H1JDdPhdw', true, '2022-10-28 13:47:45.623381');
INSERT INTO public.sessions VALUES (13, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY2OTgzNjA0fQ._9sGDUNc97SEw8nycLYAyD1OUjALBvLx2qcaHp1cUFY', true, '2022-10-28 16:00:04.105922');


--
-- Data for Name: shares; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'gersin@gersin.com', 'gersin', '$2b$12$fzprarz9Ehs1VA8a.OY3eOTd0LzKja9vKd12M9paC100/G6aeQRUu', 'https://www.rbsdirect.com.br/imagesrc/25516126.jpg?w=700', '2022-10-21 19:55:49.815557');
INSERT INTO public.users VALUES (3, 'rodrigo123@teste.com', 'rodrigoteste', '$2b$12$bCs0Dbl7kuaoLhUIYqagpeDGkN9DfnwX0jF7lnzYJh4G4YjDFg5Gq', 'https://jobsin.co/app/uploads/2019/07/2.png', '2022-10-21 21:11:00.013157');
INSERT INTO public.users VALUES (4, 'digor@gmail.com', 'digor', '$2b$12$b2a/efQn9PxCI4mPH.yq/.4XCdU962xrp3byfc./oq.G6j6TXD7.K', 'http://www.google.com', '2022-10-21 21:25:35.909525');
INSERT INTO public.users VALUES (5, 'gersada@gersada.com', 'gersada', '$2b$12$zl176ayxZG8LdJxsu/VNtOn8iav5XG4rL2WgCHwP8cq2gpgAn1JP6', 'http://www.google.com', '2022-10-21 21:29:34.4557');
INSERT INTO public.users VALUES (6, 'jerbiscleito@jerbis.com', 'jerbiscleito', '$2b$12$IZA6GMMeDJJy83oL8vD17uNj2VipHqGcgspTTKOh8CMnpE2Iak0NK', 'http://www.google.com', '2022-10-21 21:30:51.632085');
INSERT INTO public.users VALUES (7, 'gerson@gerson.com', 'gerson', '$2b$12$LjoWFykUbdMBbwV5Xpsk1uHo5lTOiqKCKAR1jLd0iAiYxlheYqzfS', 'https://saude.abril.com.br/wp-content/uploads/2021/03/bichos-foto-vauvau-Getty-Images.png', '2022-10-21 22:02:28.921354');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 5, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 2, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 12, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 16, true);


--
-- Name: posts_hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_hashtags_id_seq', 44, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 50, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 13, true);


--
-- Name: shares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shares_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pk PRIMARY KEY (id);


--
-- Name: likes likes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pk PRIMARY KEY (id);


--
-- Name: posts_hashtags posts_hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_hashtags
    ADD CONSTRAINT posts_hashtags_pk PRIMARY KEY (id);


--
-- Name: posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: shares shares_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_posts_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_posts_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: followers followers_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id);


--
-- Name: followers followers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts_hashtags posts_hashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_hashtags
    ADD CONSTRAINT posts_hashtags_fk0 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: posts_hashtags posts_hashtags_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_hashtags
    ADD CONSTRAINT posts_hashtags_fk1 FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: shares shares_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: shares shares_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

