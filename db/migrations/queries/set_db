--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', 'public', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Act; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Act" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "dateFormed" date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Act" OWNER TO postgres;

--
-- Name: Attendee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attendee" (
    id uuid NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    bio text,
    dob date NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "imgFilename" character varying(255),
    "userType" character varying(255) DEFAULT 'attendee'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Attendee" OWNER TO postgres;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event" (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    "venueName" character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    summary character varying(255) NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    region character varying(255) NOT NULL,
    postcode character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    "isFree" boolean NOT NULL,
    "purchaseUrl" character varying(255),
    status character varying(255) DEFAULT 'U'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "OrganizerId" uuid
);


ALTER TABLE public."Event" OWNER TO postgres;

--
-- Name: EventAct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventAct" (
    id uuid NOT NULL,
    "EventId" uuid,
    "ActId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."EventAct" OWNER TO postgres;

--
-- Name: EventImage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventImage" (
    id uuid NOT NULL,
    "EventId" uuid,
    filename character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."EventImage" OWNER TO postgres;

--
-- Name: EventTicket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventTicket" (
    id uuid NOT NULL,
    "EventId" uuid,
    "TicketTypeId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."EventTicket" OWNER TO postgres;

--
-- Name: FavouritedBy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FavouritedBy" (
    id uuid NOT NULL,
    "EventId" uuid,
    "AttendeeId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FavouritedBy" OWNER TO postgres;

--
-- Name: Organizer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Organizer" (
    id uuid NOT NULL,
    bio text,
    "organizationName" character varying(255) NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "imgFilename" character varying(255),
    "userType" character varying(255) DEFAULT 'organizer'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Organizer" OWNER TO postgres;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: TaggedWith; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaggedWith" (
    id uuid NOT NULL,
    "EventId" uuid,
    "TagId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TaggedWith" OWNER TO postgres;

--
-- Name: TicketType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TicketType" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    price numeric NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TicketType" OWNER TO postgres;

--
-- Name: Act Act_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Act"
    ADD CONSTRAINT "Act_pkey" PRIMARY KEY (id);


--
-- Name: Attendee Attendee_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendee"
    ADD CONSTRAINT "Attendee_email_key" UNIQUE (email);


--
-- Name: Attendee Attendee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendee"
    ADD CONSTRAINT "Attendee_pkey" PRIMARY KEY (id);


--
-- Name: EventAct EventAct_EventId_ActId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventAct"
    ADD CONSTRAINT "EventAct_EventId_ActId_key" UNIQUE ("EventId", "ActId");


--
-- Name: EventAct EventAct_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventAct"
    ADD CONSTRAINT "EventAct_pkey" PRIMARY KEY (id);


--
-- Name: EventImage EventImage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventImage"
    ADD CONSTRAINT "EventImage_pkey" PRIMARY KEY (id);


--
-- Name: EventTicket EventTicket_EventId_TicketTypeId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_EventId_TicketTypeId_key" UNIQUE ("EventId", "TicketTypeId");


--
-- Name: EventTicket EventTicket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: FavouritedBy FavouritedBy_EventId_AttendeeId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavouritedBy"
    ADD CONSTRAINT "FavouritedBy_EventId_AttendeeId_key" UNIQUE ("EventId", "AttendeeId");


--
-- Name: FavouritedBy FavouritedBy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavouritedBy"
    ADD CONSTRAINT "FavouritedBy_pkey" PRIMARY KEY (id);


--
-- Name: Organizer Organizer_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organizer"
    ADD CONSTRAINT "Organizer_email_key" UNIQUE (email);


--
-- Name: Organizer Organizer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organizer"
    ADD CONSTRAINT "Organizer_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: TaggedWith TaggedWith_EventId_TagId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaggedWith"
    ADD CONSTRAINT "TaggedWith_EventId_TagId_key" UNIQUE ("EventId", "TagId");


--
-- Name: TaggedWith TaggedWith_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaggedWith"
    ADD CONSTRAINT "TaggedWith_pkey" PRIMARY KEY (id);


--
-- Name: TicketType TicketType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketType"
    ADD CONSTRAINT "TicketType_pkey" PRIMARY KEY (id);


--
-- Name: EventAct EventAct_ActId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventAct"
    ADD CONSTRAINT "EventAct_ActId_fkey" FOREIGN KEY ("ActId") REFERENCES public."Act"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventAct EventAct_EventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventAct"
    ADD CONSTRAINT "EventAct_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventImage EventImage_EventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventImage"
    ADD CONSTRAINT "EventImage_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventTicket EventTicket_EventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventTicket EventTicket_TicketTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventTicket"
    ADD CONSTRAINT "EventTicket_TicketTypeId_fkey" FOREIGN KEY ("TicketTypeId") REFERENCES public."TicketType"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Event Event_OrganizerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_OrganizerId_fkey" FOREIGN KEY ("OrganizerId") REFERENCES public."Organizer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FavouritedBy FavouritedBy_AttendeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavouritedBy"
    ADD CONSTRAINT "FavouritedBy_AttendeeId_fkey" FOREIGN KEY ("AttendeeId") REFERENCES public."Attendee"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FavouritedBy FavouritedBy_EventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FavouritedBy"
    ADD CONSTRAINT "FavouritedBy_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaggedWith TaggedWith_EventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaggedWith"
    ADD CONSTRAINT "TaggedWith_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaggedWith TaggedWith_TagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaggedWith"
    ADD CONSTRAINT "TaggedWith_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

